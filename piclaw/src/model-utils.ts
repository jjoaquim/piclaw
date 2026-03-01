import type { Model } from "@mariozechner/pi-ai";
import type { ModelRegistry } from "@mariozechner/pi-coding-agent";

export interface ParsedModelInput {
  provider?: string;
  modelId: string;
}

export function parseModelInput(input: string): ParsedModelInput {
  const trimmed = input.trim();
  if (!trimmed) return { modelId: "" };
  const slash = trimmed.indexOf("/");
  return slash > 0
    ? { provider: trimmed.slice(0, slash), modelId: trimmed.slice(slash + 1) }
    : { modelId: trimmed };
}

export function findModel(
  models: Model<any>[],
  provider: string | undefined,
  modelId: string
): { model?: Model<any>; error?: string } {
  if (provider) {
    const match = models.find(
      (m) =>
        m.provider.toLowerCase() === provider.toLowerCase() &&
        m.id.toLowerCase() === modelId.toLowerCase(),
    );
    return match
      ? { model: match }
      : { error: `Model not found: ${provider}/${modelId}.` };
  }

  const matches = models.filter((m) => m.id.toLowerCase() === modelId.toLowerCase());
  if (matches.length === 0) return { error: `Model not found: ${modelId}.` };
  if (matches.length > 1) {
    const list = matches.map((m) => `${m.provider}/${m.id}`).join(", ");
    return { error: `Model "${modelId}" matches multiple providers: ${list}. Use provider/modelId.` };
  }
  return { model: matches[0] };
}

export function resolveModelLabel(
  modelRegistry: ModelRegistry,
  input: string
): { model?: string; error?: string } {
  const { provider, modelId } = parseModelInput(input);
  if (!modelId) return { error: "Model identifier is required." };
  modelRegistry.refresh();
  const { model, error } = findModel(modelRegistry.getAll(), provider, modelId);
  if (!model || error) return { error: error ?? "Model not found." };
  return { model: `${model.provider}/${model.id}` };
}
