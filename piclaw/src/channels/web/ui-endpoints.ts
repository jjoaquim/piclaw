/**
 * channels/web/ui-endpoints.ts – workspace/thought/ui-response endpoint helpers.
 */

/** Context contract consumed by web UI endpoint handlers. */
export interface UiEndpointsContext {
  json(payload: unknown, status?: number): Response;
  getWorkspaceVisible(): boolean;
  setWorkspaceVisible(value: boolean): void;
  getWorkspaceShowHidden(): boolean;
  setWorkspaceShowHidden(value: boolean): void;
  setPanelExpanded(turnId: string, panel: "thought" | "draft", expanded: boolean): void;
  handleUiResponse(requestId: string, outcome: unknown): { status: "ok" | "unknown_request" };
}

/** POST /workspace/visibility helper. */
export async function handleWorkspaceVisibilityRequest(req: Request, ctx: UiEndpointsContext): Promise<Response> {
  let data: { visible?: boolean; show_hidden?: boolean; showHidden?: boolean };
  try {
    data = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  if (typeof data.visible === "boolean") {
    ctx.setWorkspaceVisible(data.visible);
  } else {
    ctx.setWorkspaceVisible(Boolean(data.visible));
  }

  if (typeof data.show_hidden === "boolean") {
    ctx.setWorkspaceShowHidden(data.show_hidden);
  } else if (typeof data.showHidden === "boolean") {
    ctx.setWorkspaceShowHidden(data.showHidden);
  }

  return ctx.json({
    status: "ok",
    visible: ctx.getWorkspaceVisible(),
    show_hidden: ctx.getWorkspaceShowHidden(),
  });
}

/** POST /agent/thought/visibility helper. */
export async function handleThoughtVisibilityRequest(req: Request, ctx: UiEndpointsContext): Promise<Response> {
  let data: { turn_id?: string; turnId?: string; panel?: string; expanded?: boolean };
  try {
    data = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  const turnId = (data.turn_id || data.turnId || "").trim();
  const panel = data.panel === "draft" ? "draft" : "thought";
  const expanded = Boolean(data.expanded);
  if (!turnId) return ctx.json({ error: "Missing turn_id" }, 400);

  ctx.setPanelExpanded(turnId, panel, expanded);
  return ctx.json({ status: "ok", turn_id: turnId, panel, expanded });
}

/** POST /agent/respond helper. */
export async function handleAgentRespondRequest(req: Request, ctx: UiEndpointsContext): Promise<Response> {
  let data: { request_id?: string; outcome?: unknown };
  try {
    data = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  if (!data.request_id || typeof data.request_id !== "string") {
    return ctx.json({ error: "Missing or invalid request_id" }, 400);
  }
  if (data.request_id.length > 256) {
    return ctx.json({ error: "request_id too long" }, 400);
  }

  const status = ctx.handleUiResponse(data.request_id, data.outcome);
  return ctx.json(status);
}
