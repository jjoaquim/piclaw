/**
 * channels/web/manifest.ts – Web manifest response helper.
 */

export interface ManifestIconMeta {
  updatedAt?: string;
  contentType?: string;
}

export interface ManifestRequestContext {
  assistantName?: string | null;
  assistantAvatar?: string | null;
  ensureAvatarCache(kind: "agent", source: string): Promise<ManifestIconMeta | null>;
}

export async function handleManifestRequest(req: Request, ctx: ManifestRequestContext): Promise<Response> {
  const encoder = new TextEncoder();
  const baseName = ctx.assistantName || "PiClaw";
  const icons: Array<{ src: string; sizes: string; type: string; purpose?: string }> = [
    { src: "/static/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/static/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/static/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    { src: "/static/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ];

  if (ctx.assistantAvatar) {
    try {
      const meta = await ctx.ensureAvatarCache("agent", ctx.assistantAvatar);
      if (meta) {
        const versionSource = meta.updatedAt || new Date().toISOString();
        const version = encodeURIComponent(versionSource);
        icons.unshift({
          src: `/avatar/agent?v=${version}`,
          sizes: "any",
          type: meta.contentType || "image/png",
          purpose: "any maskable",
        });
      }
    } catch (err) {
      console.warn("[web] Failed to prepare agent avatar for manifest:", err);
    }
  }

  const manifest = {
    name: baseName,
    short_name: baseName,
    description: "Slack-like interface for coding agents",
    start_url: "/",
    display: "standalone",
    display_override: ["window-controls-overlay"],
    background_color: "#ffffff",
    theme_color: "#ffffff",
    color_scheme: "dark light",
    icons,
  };

  const body = `${JSON.stringify(manifest, null, 2)}\n`;
  const headers: Record<string, string> = {
    "Content-Type": "application/manifest+json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": String(encoder.encode(body).length),
  };

  if (req.method === "HEAD") {
    return new Response(null, { status: 200, headers });
  }

  return new Response(body, { status: 200, headers });
}
