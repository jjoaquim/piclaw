import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import OpenAI from "openai";
import {
  AssistantMessageEventStream,
  supportsXhigh,
} from "@mariozechner/pi-ai";
import {
  convertResponsesMessages,
  convertResponsesTools,
  processResponsesStream,
} from "@mariozechner/pi-ai/dist/providers/openai-responses-shared.js";
import { streamSimpleOpenAICompletions } from "@mariozechner/pi-ai/dist/providers/openai-completions.js";
import { buildBaseOptions, clampReasoning } from "@mariozechner/pi-ai/dist/providers/simple-options.js";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PROVIDER = "azure-openai";
const FOUNDRY_PROVIDER = "azure-foundry";
// Use custom API names so we don't override global handlers.
const AZURE_API = "azure-openai-responses-mi";
const FOUNDRY_API = "azure-foundry-openai-completions-mi";

// Pitfalls / guardrails:
// - Never use api: "openai-responses" or "openai-completions" here. That overrides the global
//   handlers and breaks other providers (e.g., GitHub Copilot). Always use AZURE_API/FOUNDRY_API.
// - Always set per-model `api` to the custom API names. If you omit it, the model will route
//   through the global handlers and fail with auth errors.
// - OpenAI SDK always injects `Authorization: Bearer <apiKey>`. Do not add Authorization/api-key
//   headers yourself or enable authHeader; Azure/Copilot will reject the request.
// - Managed identity only. AOAI_RESOURCE/FOUNDRY_RESOURCE must match the target resource or
//   tokens will be invalid (401/403).
// - MODEL_SPECS.reasoning=false will clamp thinking to off for that model.
// - Do not remove tool-call ID sanitization or TOOL_CALL_PROVIDERS; Azure Responses rejects
//   non-compliant IDs.
const MODEL_ID = process.env.AOAI_MODEL_ID || "gpt-5-2-codex";
const MODEL_NAME = process.env.AOAI_MODEL_NAME || `Azure ${MODEL_ID}`;
const MODEL_IDS = (process.env.AOAI_MODEL_IDS || MODEL_ID)
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);
const MODEL_NAMES = (process.env.AOAI_MODEL_NAMES || "")
  .split(",")
  .map((entry) => entry.trim());
const BASE_URL = process.env.AOAI_BASE_URL || "https://{RESOURCE_NAME}.openai.azure.com/openai/v1";
const AOAI_IMAGE_MODEL_ID = process.env.AOAI_IMAGE_MODEL_ID || "gpt-image-1-5";
const AOAI_API_VERSION = process.env.AOAI_API_VERSION || process.env.OPENAI_API_VERSION || "2024-02-15-preview";
const FOUNDRY_BASE_URL =
  process.env.FOUNDRY_BASE_URL || "https://{FOUNDRY_RESOURCE}.cognitiveservices.azure.com/openai/v1";
const FOUNDRY_MODEL_IDS = (process.env.FOUNDRY_MODEL_IDS || "mistral-large-3,flux-2-pro")
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);
const FOUNDRY_MODEL_NAMES = (process.env.FOUNDRY_MODEL_NAMES || "")
  .split(",")
  .map((entry) => entry.trim());
const FOUNDRY_IMAGE_MODEL_ID = process.env.FOUNDRY_IMAGE_MODEL_ID || "flux-2-pro";
const FOUNDRY_API_VERSION = process.env.FOUNDRY_API_VERSION || AOAI_API_VERSION;
const FOUNDRY_IMAGE_API_VERSION = process.env.FOUNDRY_IMAGE_API_VERSION || "preview";
const FOUNDRY_IMAGE_BASE_URL = process.env.FOUNDRY_IMAGE_BASE_URL || "";
const FOUNDRY_TEXT_MODEL_IDS = FOUNDRY_MODEL_IDS.filter(
  (id) => id !== FOUNDRY_IMAGE_MODEL_ID && !id.startsWith("flux-")
);
// Managed identity only: fetch AAD tokens from the VM metadata service.
// This extension ONLY works with AAD managed identity (Azure OpenAI + Foundry), not API key auth.
const IMDS_URL = "http://169.254.169.254/metadata/identity/oauth2/token";
const IMDS_API_VERSION = "2018-02-01";
const RESOURCE = process.env.AOAI_RESOURCE || process.env.FOUNDRY_RESOURCE || "https://cognitiveservices.azure.com/";
const CACHE_DIR = process.env.AOAI_TOKEN_CACHE_DIR || "/workspace/.piclaw/cache";
const CACHE_FILE = process.env.AOAI_TOKEN_CACHE_FILE || `${CACHE_DIR}/aoai-token.json`;
const SKEW_SECONDS = Number(process.env.AOAI_TOKEN_SKEW_SECONDS || "300");
const TOOL_CALL_PROVIDERS = new Set(["openai", "openai-codex", "opencode", PROVIDER, FOUNDRY_PROVIDER]);

// Per-model overrides: contextWindow, maxTokens, reasoning
const MODEL_SPECS: Record<string, { contextWindow?: number; maxTokens?: number; reasoning?: boolean }> = {
  "gpt-5-2-codex":      { contextWindow: 200000, maxTokens: 64000,  reasoning: true },
  "gpt-5-3-codex":      { contextWindow: 200000, maxTokens: 64000,  reasoning: true },
  "gpt-5-1-codex-mini": { contextWindow: 200000, maxTokens: 64000,  reasoning: true },
  "gpt-5-1":            { contextWindow: 1048576, maxTokens: 100000, reasoning: true },
  "gpt-5-mini":         { contextWindow: 1048576, maxTokens: 64000,  reasoning: true },
  "mistral-large-3":    { contextWindow: 131072, maxTokens: 16384,  reasoning: false },
  "flux-2-pro":         { contextWindow: 4096,   maxTokens: 4096,   reasoning: false },
};
const DEFAULT_SPEC = { contextWindow: 200000, maxTokens: 64000, reasoning: false };

function sanitizeOpenAIId(value?: string): string | undefined {
  if (!value) return value;
  let next = value.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+$/, "");
  if (next.length > 64) next = next.slice(0, 64).replace(/_+$/, "");
  return next;
}

function sanitizeToolCallId(value?: string): string | undefined {
  if (!value) return value;
  if (!value.includes("|")) return sanitizeOpenAIId(value);
  const [callId, itemId, ...rest] = value.split("|");
  const sanitizedCallId = sanitizeOpenAIId(callId) || callId;
  const sanitizedItemId = sanitizeOpenAIId(itemId) || itemId;
  const tail = rest.length ? `|${rest.join("|")}` : "";
  if (sanitizedItemId) return `${sanitizedCallId}|${sanitizedItemId}${tail}`;
  return sanitizedCallId;
}


interface TokenCache {
  accessToken?: string;
  expiresOn?: string;
  expiresOnEpoch?: number;
}

type ImageArgs = {
  prompt: string;
  size?: string;
  count?: number;
  quality?: "low" | "medium" | "high";
  style?: "natural" | "vivid";
};

function readCache(): TokenCache {
  try {
    const raw = readFileSync(CACHE_FILE, "utf-8");
    return JSON.parse(raw) as TokenCache;
  } catch {
    return {};
  }
}

function isTokenValid(cache: TokenCache): boolean {
  if (!cache.accessToken || !cache.expiresOnEpoch) return false;
  const now = Math.floor(Date.now() / 1000);
  return cache.expiresOnEpoch - now > SKEW_SECONDS;
}

function writeCache(token: string, expiresOn: string | undefined, expiresOnEpoch: number): void {
  mkdirSync(CACHE_DIR, { recursive: true });
  const payload: TokenCache = { accessToken: token, expiresOn, expiresOnEpoch };
  writeFileSync(CACHE_FILE, `${JSON.stringify(payload, null, 2)}\n`);
}

async function fetchTokenFromImds(): Promise<TokenCache> {
  const url = `${IMDS_URL}?api-version=${IMDS_API_VERSION}&resource=${encodeURIComponent(RESOURCE)}`;
  const response = await fetch(url, {
    headers: {
      Metadata: "true",
    },
  });
  if (!response.ok) {
    throw new Error(`IMDS token request failed (${response.status})`);
  }
  const data = (await response.json()) as {
    access_token?: string;
    expires_on?: string;
  };

  if (!data.access_token) {
    throw new Error("IMDS token response missing access_token");
  }

  const expiresRaw = data.expires_on || "";
  let expiresOnEpoch = Number(expiresRaw);
  if (!Number.isFinite(expiresOnEpoch)) {
    const parsed = Date.parse(expiresRaw);
    if (Number.isFinite(parsed)) {
      expiresOnEpoch = Math.floor(parsed / 1000);
    }
  }
  if (!Number.isFinite(expiresOnEpoch) || expiresOnEpoch <= 0) {
    expiresOnEpoch = Math.floor(Date.now() / 1000) + 3300;
  }

  writeCache(data.access_token, expiresRaw, expiresOnEpoch);
  return { accessToken: data.access_token, expiresOn: expiresRaw, expiresOnEpoch };
}

async function ensureToken(force = false): Promise<TokenCache> {
  const cached = readCache();
  if (!force && isTokenValid(cached)) return cached;

  try {
    return await fetchTokenFromImds();
  } catch (error) {
    console.error("[azure-openai] Failed to refresh token via IMDS:", error);
    return cached;
  }
}

async function getAccessToken(): Promise<string> {
  const token = await ensureToken();
  if (!token.accessToken) {
    throw new Error("Missing Azure access token. Ensure IMDS is available.");
  }
  return token.accessToken;
}

function isAuthError(error: unknown): boolean {
  const status = (error as { status?: number })?.status;
  if (status === 401 || status === 403) return true;
  const message = error instanceof Error ? error.message : String(error || "");
  return /unauthorized|forbidden|401|403/i.test(message);
}

function parseArgs(input: string): ImageArgs | null {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  const args: ImageArgs = { prompt: "" };
  const promptParts: string[] = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token === "--size" && tokens[i + 1]) {
      args.size = tokens[i + 1];
      i += 1;
      continue;
    }
    if (token === "--count" && tokens[i + 1]) {
      const count = Number(tokens[i + 1]);
      if (Number.isFinite(count)) args.count = Math.min(4, Math.max(1, Math.floor(count)));
      i += 1;
      continue;
    }
    if (token === "--quality" && tokens[i + 1]) {
      const quality = tokens[i + 1] as ImageArgs["quality"];
      if (["low", "medium", "high"].includes(quality)) args.quality = quality;
      i += 1;
      continue;
    }
    if (token === "--style" && tokens[i + 1]) {
      const style = tokens[i + 1] as ImageArgs["style"];
      if (["natural", "vivid"].includes(style)) args.style = style;
      i += 1;
      continue;
    }
    promptParts.push(token);
  }

  args.prompt = promptParts.join(" ").trim();
  if (!args.prompt) return null;
  return args;
}

async function generateImage(baseUrl: string, model: string, args: ImageArgs, includeStyle: boolean) {
  await getAccessToken();
  const client = createAzureClient(baseUrl, {});

  const payload: Record<string, any> = {
    model,
    prompt: args.prompt,
    size: args.size || "1024x1024",
    quality: args.quality || "high",
    n: args.count || 1,
  };
  if (includeStyle && args.style) payload.style = args.style;

  const response = await client.images.generate(payload);
  const images = response.data || [];
  if (images.length === 0) {
    throw new Error("Image API returned no images.");
  }
  return images;
}

function getAzureEndpoint(baseUrl: string): string {

  return baseUrl.replace(/\/openai\/v1\/?$/, "").replace(/\/openai\/?$/, "");
}


function createAzureClient(baseUrl: string, headers: Record<string, string>) {
  return new OpenAI({
    apiKey: async () => await getAccessToken(),
    baseURL: baseUrl,
    defaultHeaders: headers,
    dangerouslyAllowBrowser: true,
  });
}

function getFoundryImageEndpoint(): string {
  if (FOUNDRY_IMAGE_BASE_URL) return FOUNDRY_IMAGE_BASE_URL.replace(/\/+$/, "");
  const base = getAzureEndpoint(FOUNDRY_BASE_URL);
  try {
    const url = new URL(base);
    if (url.hostname.endsWith(".cognitiveservices.azure.com")) {
      url.hostname = url.hostname.replace(".cognitiveservices.azure.com", ".services.ai.azure.com");
      return url.toString().replace(/\/+$/, "");
    }
    if (url.hostname.endsWith(".openai.azure.com")) {
      url.hostname = url.hostname.replace(".openai.azure.com", ".services.ai.azure.com");
      return url.toString().replace(/\/+$/, "");
    }
    return base;
  } catch {
    return base;
  }
}

function parseSize(size?: string): { width: number; height: number } {
  if (!size) return { width: 1024, height: 1024 };
  const match = size.toLowerCase().match(/(\d+)\s*x\s*(\d+)/);
  if (!match) return { width: 1024, height: 1024 };
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!Number.isFinite(width) || !Number.isFinite(height)) return { width: 1024, height: 1024 };
  return { width, height };
}

async function generateFoundryImage(model: string, args: ImageArgs) {
  const token = await ensureToken();
  if (!token.accessToken) {
    throw new Error("Missing Azure access token. Ensure IMDS is available.");
  }

  const endpoint = getFoundryImageEndpoint();
  const url = `${endpoint}/providers/blackforestlabs/v1/${encodeURIComponent(model)}?api-version=${encodeURIComponent(FOUNDRY_IMAGE_API_VERSION)}`;
  const size = parseSize(args.size);
  const payload: Record<string, any> = {
    prompt: args.prompt,
    width: size.width,
    height: size.height,
    n: args.count || 1,
    model,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${body}`.trim());
  }
  const data = (await res.json()) as { data?: Array<{ b64_json?: string }> };
  const images = data.data || [];
  if (images.length === 0) {
    throw new Error("Image API returned no images.");
  }
  return images;
}

function saveImages(prefix: string, prompt: string, images: Array<{ b64_json?: string }>) {
  const outDir = join("/workspace", "exports", "images");
  mkdirSync(outDir, { recursive: true });

  const lines: string[] = [];
  images.forEach((image, idx) => {
    const b64 = image.b64_json;
    if (!b64) return;
    const buffer = Buffer.from(b64, "base64");
    const filename = `${prefix}-${Date.now()}-${idx + 1}.png`;
    const relPath = join("exports", "images", filename).replace(/\\/g, "/");
    const absPath = join("/workspace", relPath);
    writeFileSync(absPath, buffer);
    const url = `/workspace/raw?path=${encodeURIComponent(relPath)}`;
    lines.push(`![${prompt}](${url})`);
    lines.push(`Download: ${url}`);
  });
  return lines;
}

const PICLAW_PORT = process.env.PICLAW_PORT || "3000";
const PICLAW_BASE = `http://localhost:${PICLAW_PORT}`;
const INTERNAL_SECRET = process.env.PICLAW_INTERNAL_SECRET || process.env.PICLAW_WEB_INTERNAL_SECRET || "";

async function postPlaceholder(content: string, threadId?: number): Promise<number | null> {
  try {
    const body: Record<string, unknown> = { content };
    if (threadId) body.thread_id = threadId;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (INTERNAL_SECRET) headers["x-piclaw-internal-secret"] = INTERNAL_SECRET;
    const res = await fetch(`${PICLAW_BASE}/internal/post`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: number };
    return data.id ?? null;
  } catch {
    return null;
  }
}

async function updatePost(id: number, content: string, threadId?: number): Promise<boolean> {
  try {
    const body: Record<string, unknown> = { content };
    if (threadId) body.thread_id = threadId;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (INTERNAL_SECRET) headers["x-piclaw-internal-secret"] = INTERNAL_SECRET;
    const res = await fetch(`${PICLAW_BASE}/post/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function streamAzureOpenAIResponses(model: any, context: any, options: any) {
  const stream = new AssistantMessageEventStream();



  (async () => {
    const output = {
      role: "assistant",
      content: [],
      api: model.api,
      provider: model.provider,
      model: model.id,
      usage: {
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
        totalTokens: 0,
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
      },
      stopReason: "stop",
      timestamp: Date.now(),
    };

    try {
      const headers = { ...model.headers };
      if (options?.headers) {
        Object.assign(headers, options.headers);
      }
      for (const key of Object.keys(headers)) {
        const lower = key.toLowerCase();
        if (lower === "authorization" || lower === "api-key") {
          delete headers[key];
        }
      }

      const messages = convertResponsesMessages(model, context, TOOL_CALL_PROVIDERS);

      // Post-conversion sanitization for Azure OpenAI compatibility.
      // Azure requires: id/call_id max 64 chars, only [a-zA-Z0-9_-].
      // Upstream normalization misses some edge cases (cross-provider IDs without "|",
      // stale encrypted signatures, etc.). We sanitize ALL items here.
      for (const item of messages) {
        if (item.id && typeof item.id === "string") {
          const nextId = sanitizeOpenAIId(item.id);
          if (nextId) item.id = nextId;
        }
        if (item.call_id && typeof item.call_id === "string") {
          const nextCallId = sanitizeOpenAIId(item.call_id);
          if (nextCallId) item.call_id = nextCallId;
        }
      }
      const params: Record<string, any> = {
        model: model.id,
        input: messages,
        stream: true,
      };

      // Only include OpenAI-specific params for models that support them
      if (model.reasoning) {
        params.prompt_cache_key = options?.sessionId;
        params.text = { format: { type: "text" }, verbosity: "medium" };
      }

      if (options?.maxTokens) {
        params.max_output_tokens = options?.maxTokens;
      }
      if (options?.temperature !== undefined) {
        params.temperature = options?.temperature;
      }
      if (context.tools) {
        params.tools = convertResponsesTools(context.tools);
      }

      if (model.reasoning) {
        if (options?.reasoningEffort || options?.reasoningSummary) {
          params.reasoning = {
            effort: options?.reasoningEffort || "medium",
            summary: options?.reasoningSummary || "auto",
          };
          params.include = ["reasoning.encrypted_content"];
        } else if (String(model.name).toLowerCase().startsWith("gpt-5")) {
          messages.push({
            role: "developer",
            content: [
              {
                type: "input_text",
                text: "# Juice: 0 !important",
              },
            ],
          });
        }
      }
      const createStream = async () => {
        const client = createAzureClient(model.baseUrl, headers);
        return client.responses.create(
          params,
          options?.signal ? { signal: options.signal } : undefined
        );
      };

      await getAccessToken();

      let openaiStream;
      try {
        openaiStream = await createStream();
      } catch (error) {
        if (!isAuthError(error)) throw error;
        await ensureToken(true);
        openaiStream = await createStream();
      }

      stream.push({ type: "start", partial: output });
      await processResponsesStream(openaiStream, output, stream, model);

      if (options?.signal?.aborted) {
        throw new Error("Request was aborted");
      }
      if (output.stopReason === "aborted" || output.stopReason === "error") {
        throw new Error(`Azure request failed: ${output.errorMessage || "unknown error"}`);
      }

      stream.push({ type: "done", reason: output.stopReason, message: output });
      stream.end();
    } catch (error) {
      console.error(`[azure-openai] Error for ${model.id}:`, error instanceof Error ? error.message : error);
      for (const block of output.content) delete (block as any).index;
      output.stopReason = options?.signal?.aborted ? "aborted" : "error";
      output.errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      stream.push({ type: "error", reason: output.stopReason, error: output });
      stream.end();
    }
  })();

  return stream;
}

function streamSimpleAzureOpenAIResponses(model: any, context: any, options: any) {
  const base = buildBaseOptions(model, options, options?.apiKey);
  const reasoningEffort = supportsXhigh(model) ? options?.reasoning : clampReasoning(options?.reasoning);

  return streamAzureOpenAIResponses(model, context, {
    ...base,
    reasoningEffort,
  });
}

function streamSimpleFoundryOpenAICompletions(model: any, context: any, options: any) {
  // Foundry uses the standard OpenAI Completions transport, but we keep a custom API name
  // so this extension doesn't override global handlers. Force the api back to openai-completions
  // when calling the built-in stream implementation.
  const overrideModel = model.api === "openai-completions" ? model : { ...model, api: "openai-completions" };
  return streamSimpleOpenAICompletions(overrideModel, context, options);
}

function registerProvider(pi: ExtensionAPI, token: string) {
  const openaiModels = MODEL_IDS.map((id, idx) => {
    const spec = MODEL_SPECS[id] || DEFAULT_SPEC;
    return {
      id,
      name: MODEL_NAMES[idx] || (id === MODEL_ID ? MODEL_NAME : `Azure ${id}`),
      api: AZURE_API,
      reasoning: spec.reasoning ?? true,
      input: ["text"],
      contextWindow: spec.contextWindow ?? 200000,
      maxTokens: spec.maxTokens ?? 64000,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    };
  });

  pi.registerProvider(PROVIDER, {
    baseUrl: BASE_URL,
    api: AZURE_API,
    apiKey: token,
    streamSimple: streamSimpleAzureOpenAIResponses,
    models: openaiModels,
  });

  const foundryModels = FOUNDRY_TEXT_MODEL_IDS.map((id, idx) => {
    const spec = MODEL_SPECS[id] || DEFAULT_SPEC;
    return {
      id,
      name: FOUNDRY_MODEL_NAMES[idx] || `Azure Foundry ${id}`,
      api: FOUNDRY_API,
      reasoning: spec.reasoning ?? false,
      input: ["text"],
      contextWindow: spec.contextWindow ?? 200000,
      maxTokens: spec.maxTokens ?? 64000,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    };
  });

  if (foundryModels.length > 0) {
    pi.registerProvider(FOUNDRY_PROVIDER, {
      baseUrl: FOUNDRY_BASE_URL,
      api: FOUNDRY_API,
      apiKey: token,
      streamSimple: streamSimpleFoundryOpenAICompletions,
      models: foundryModels,
    });
  }
}

export default function (pi: ExtensionAPI) {
  pi.registerCommand("image", {
    description: "Generate an image with Azure OpenAI",
    handler: async (input, ctx) => {
      const parsed = parseArgs(input || "");
      if (!parsed) {
        pi.sendMessage({
          customType: "image",
          content:
            "Usage: /image <prompt> [--size 1024x1024] [--count 1] [--quality low|medium|high] [--style natural|vivid]",
          display: true,
        });
        return;
      }

      const statusText = `⏳ Generating image… (${AOAI_IMAGE_MODEL_ID})`;
      const placeholderId = await postPlaceholder(statusText);

      void (async () => {
        try {
          const images = await generateImage(BASE_URL, AOAI_IMAGE_MODEL_ID, parsed, true);
          const lines = saveImages("azure-image", parsed.prompt, images);
          const caption = `Azure image (${AOAI_IMAGE_MODEL_ID}) — ${parsed.prompt}`;
          const message = [caption, "", ...lines].join("\n");
          if (placeholderId) {
            await updatePost(placeholderId, message);
          } else {
            pi.sendMessage({ customType: "image", content: message, display: true });
          }
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          const failContent = `Image generation failed: ${errMsg}`;
          if (placeholderId) {
            await updatePost(placeholderId, failContent);
          } else {
            pi.sendMessage({ customType: "image", content: failContent, display: true });
          }
        }
      })();
    },
  });

  pi.registerCommand("flux", {
    description: "Generate an image with Azure Foundry (FLUX.2-pro)",
    handler: async (input, ctx) => {
      const parsed = parseArgs(input || "");
      if (!parsed) {
        pi.sendMessage({
          customType: "flux",
          content:
            "Usage: /flux <prompt> [--size 1024x1024] [--count 1] [--quality low|medium|high]",
          display: true,
        });
        return;
      }

      const statusText = `⏳ Generating Foundry image… (${FOUNDRY_IMAGE_MODEL_ID})`;
      const placeholderId = await postPlaceholder(statusText);

      void (async () => {
        try {
          const images = await generateFoundryImage(FOUNDRY_IMAGE_MODEL_ID, parsed);
          const lines = saveImages("foundry-image", parsed.prompt, images);
          const caption = `Foundry image (${FOUNDRY_IMAGE_MODEL_ID}) — ${parsed.prompt}`;
          const message = [caption, "", ...lines].join("\n");
          if (placeholderId) {
            await updatePost(placeholderId, message);
          } else {
            pi.sendMessage({ customType: "flux", content: message, display: true });
          }
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          const failContent = `Foundry image generation failed: ${errMsg}`;
          if (placeholderId) {
            await updatePost(placeholderId, failContent);
          } else {
            pi.sendMessage({ customType: "flux", content: failContent, display: true });
          }
        }
      })();
    },
  });

  let timer: ReturnType<typeof setTimeout> | null = null;

  const scheduleNext = (expiresOnEpoch?: number) => {
    if (timer) clearTimeout(timer);
    const now = Math.floor(Date.now() / 1000);
    const delaySeconds = expiresOnEpoch
      ? Math.max(60, expiresOnEpoch - now - SKEW_SECONDS)
      : 60;
    timer = setTimeout(() => void refresh(), delaySeconds * 1000);
  };

  const refresh = async () => {
    const cache = await ensureToken();
    if (cache.accessToken) {
      registerProvider(pi, cache.accessToken);
    }
    scheduleNext(cache.expiresOnEpoch);
  };

  pi.on("session_start", () => {
    void refresh();
  });

  pi.on("session_shutdown", () => {
    if (timer) clearTimeout(timer);
  });

  void refresh();
}
