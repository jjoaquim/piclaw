/**
 * channels/web/manifest.ts – Web manifest response helper.
 */
/** Build and return the web app manifest JSON (or HEAD headers only). */
export async function handleManifestRequest(req, ctx) {
    const encoder = new TextEncoder();
    const baseName = ctx.assistantName || "PiClaw";
    const icons = [
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
        }
        catch (err) {
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
    const headers = {
        "Content-Type": "application/manifest+json; charset=utf-8",
        "Cache-Control": "no-store",
        "Content-Length": String(encoder.encode(body).length),
    };
    if (req.method === "HEAD") {
        return new Response(null, { status: 200, headers });
    }
    return new Response(body, { status: 200, headers });
}
