# Azure OpenAI + Foundry managed-identity extension (piclaw)

This note documents the piclaw extension that registers Azure OpenAI and Azure AI Foundry providers using **managed identity (IMDS)**. It also explains the **custom API names** required to avoid overriding global OpenAI handlers.

## Purpose

- Provide an Azure OpenAI provider (`azure-openai`) using managed identity (no Azure CLI dependency).
- Provide an Azure AI Foundry provider (`azure-foundry`) for text and image endpoints.
- Stream Responses API output with tool-call ID normalization and text output forcing.
- **Avoid global handler overrides** by using custom API names.

## Key design choices

- **Managed identity token** via Azure IMDS (no `az` CLI dependency).
- **Token cache** written to `${AOAI_TOKEN_CACHE_DIR}` with a refresh skew.
- **OpenAI client** from the `openai` package, configured with the Azure Responses API base URL.
- **Custom API names** so this extension does *not* replace the global `openai-responses` / `openai-completions` handlers.
- **Tool-call ID normalization + sanitization** for Azure Responses constraints.
- **Thinking level support** maps `/thinking` settings to `reasoning.effort` (clamped for xhigh when needed).
- **Text output forcing** via `text: { format: { type: "text" }, verbosity: "medium" }`.

## Pitfalls / guardrails

- **Do not use** `api: "openai-responses"` or `api: "openai-completions"` in this extension. That overrides global handlers and breaks other providers (e.g., GitHub Copilot).
- **Always set per-model `api`** to the custom API names. If you omit it, the model routes through global handlers and fails with auth errors.
- The OpenAI SDK always injects `Authorization: Bearer <apiKey>`. **Do not** add `Authorization` / `api-key` headers yourself or enable `authHeader`.
- This extension is **managed identity only**. `AOAI_RESOURCE` / `FOUNDRY_RESOURCE` must match the target resource or tokens will be invalid (401/403).
- `MODEL_SPECS.reasoning=false` will clamp thinking to off for that model.
- Do not remove tool-call ID sanitization or `TOOL_CALL_PROVIDERS`; Azure Responses rejects non‑compliant IDs.

## Provider registration

### Azure OpenAI (Responses)

- Provider ID: `azure-openai`
- API name: `azure-openai-responses-mi`
- Base URL: `AOAI_BASE_URL` (example: `https://{RESOURCE}.openai.azure.com/openai/v1`)
- Model IDs: `AOAI_MODEL_IDS` (defaults to `AOAI_MODEL_ID`)

Registered by `registerProvider()`:

```ts
pi.registerProvider("azure-openai", {
  baseUrl: AOAI_BASE_URL,
  api: "azure-openai-responses-mi",
  apiKey: token,
  streamSimple: streamSimpleAzureOpenAIResponses,
  models: [
    {
      id: "gpt-5-2-codex",
      name: "Azure GPT-5.2 Codex",
      api: "azure-openai-responses-mi",
      reasoning: true,
      input: ["text"],
      contextWindow: 200000,
      maxTokens: 64000,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    },
  ],
});
```

### Azure AI Foundry (Completions)

- Provider ID: `azure-foundry`
- API name: `azure-foundry-openai-completions-mi`
- Base URL: `FOUNDRY_BASE_URL` (example: `https://{FOUNDRY_RESOURCE}.cognitiveservices.azure.com/openai/v1`)
- Model IDs: `FOUNDRY_MODEL_IDS`

The Foundry stream wrapper forces the model API to `openai-completions` when invoking the built‑in OpenAI completions implementation, while keeping a **custom API name** for routing:

```ts
function streamSimpleFoundryOpenAICompletions(model, context, options) {
  const overrideModel = model.api === "openai-completions" ? model : { ...model, api: "openai-completions" };
  return streamSimpleOpenAICompletions(overrideModel, context, options);
}
```

## Token handling

### Token cache format

```json
{
  "accessToken": "...",
  "expiresOn": "2026-03-04 12:05:41.000000",
  "expiresOnEpoch": 1772625941
}
```

### IMDS fetch

- URL: `http://169.254.169.254/metadata/identity/oauth2/token`
- API version: `2018-02-01`
- Resource: `https://cognitiveservices.azure.com/` (override with `AOAI_RESOURCE` / `FOUNDRY_RESOURCE`)
- Header: `Metadata: true`

## Streaming and message conversion

### Tool-call ID normalization

Uses `convertResponsesMessages(model, context, TOOL_CALL_PROVIDERS)` with:

```ts
const TOOL_CALL_PROVIDERS = new Set([
  "openai",
  "openai-codex",
  "opencode",
  "azure-openai",
  "azure-foundry",
]);
```

Additional sanitization enforces Azure constraints (64‑char max, `[a-zA-Z0-9_-]`).

### Text output forcing

The Azure Responses API can return only reasoning items unless a text output format is provided. The extension injects:

```ts
text: { format: { type: "text" }, verbosity: "medium" }
```

### Thinking levels

- Thinking level is passed via `options.reasoning` and clamped if necessary (`xhigh` → `high` unless model supports xhigh).
- If `reasoningEffort` / `reasoningSummary` are present:

```ts
reasoning: { effort: ..., summary: ... }
include: ["reasoning.encrypted_content"]
```

- If not explicitly set and the model is GPT‑5, a developer instruction suppresses hidden reasoning.

## Environment variables

- `AOAI_BASE_URL` – Azure OpenAI Responses API base URL
- `AOAI_MODEL_ID` – model deployment ID
- `AOAI_MODEL_IDS` – comma‑separated list of model IDs
- `AOAI_MODEL_NAME` / `AOAI_MODEL_NAMES` – display names
- `AOAI_IMAGE_MODEL_ID` – image model ID (optional)
- `AOAI_RESOURCE` – resource URI for IMDS token fetch (default `https://cognitiveservices.azure.com/`)
- `AOAI_TOKEN_CACHE_DIR` – cache directory (default `/workspace/.piclaw/cache`)
- `AOAI_TOKEN_CACHE_FILE` – cache file path (default `${AOAI_TOKEN_CACHE_DIR}/aoai-token.json`)
- `AOAI_TOKEN_SKEW_SECONDS` – refresh skew in seconds (default `300`)

- `FOUNDRY_BASE_URL` – Foundry base URL
- `FOUNDRY_MODEL_IDS` / `FOUNDRY_MODEL_NAMES` – Foundry model list + names
- `FOUNDRY_IMAGE_MODEL_ID` – Foundry image model ID
- `FOUNDRY_IMAGE_BASE_URL` – Optional explicit Foundry image base URL
- `FOUNDRY_IMAGE_API_VERSION` – Foundry image API version (default `preview`)
- `FOUNDRY_RESOURCE` – resource URI for IMDS token fetch

## Files and paths

- **Extension source**: `~/.pi/agent/extensions/azure-openai-token.ts`
- **Token cache**: `${AOAI_TOKEN_CACHE_DIR}/aoai-token.json`

## Troubleshooting

- If model output is missing: verify the `text` format block is being injected.
- If tool call errors appear: ensure `TOOL_CALL_PROVIDERS` includes `azure-openai`/`azure-foundry` and that ID sanitization remains.
- If tokens fail: check IMDS connectivity (`curl -H Metadata:true http://169.254.169.254/...`).
- If other providers break: verify you did **not** register `openai-responses` / `openai-completions` in this extension.
