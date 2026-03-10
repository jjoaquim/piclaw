/**
 * web/http/route-flags.ts – Route classification helpers for web requests.
 */
const APPLE_ICON_PATHS = new Set([
    "/apple-touch-icon.png",
    "/apple-touch-icon-precomposed.png",
    "/apple-touch-icon-180x180.png",
    "/apple-touch-icon-167x167.png",
    "/apple-touch-icon-152x152.png",
]);
/**
 * Determine which /static/ paths are safe to serve without authentication.
 * Public pages only need styling, icons, and the login bundle.
 */
export function isPublicStaticPath(pathname) {
    if (pathname.startsWith("/static/fonts/"))
        return true;
    if (pathname === "/static/dist/login.bundle.js")
        return true;
    if (pathname === "/static/dist/login.bundle.js.map")
        return true;
    if (pathname === "/static/dist/login.bundle.css")
        return true;
    if (pathname === "/static/dist/login.bundle.css.map")
        return true;
    if (pathname.startsWith("/static/") && /\.(png|ico|svg|jpg|jpeg|webp|gif)$/i.test(pathname))
        return true;
    return false;
}
/** Compute common route flags used by auth/security/dispatch flows. */
export function getRouteFlags(req, pathname) {
    const isGetOrHead = req.method === "GET" || req.method === "HEAD";
    const isAuthVerify = req.method === "POST" && pathname === "/auth/verify";
    const isWebauthnLoginStart = req.method === "POST" && pathname === "/auth/webauthn/login/start";
    const isWebauthnLoginFinish = req.method === "POST" && pathname === "/auth/webauthn/login/finish";
    const isWebauthnRegisterStart = req.method === "POST" && pathname === "/auth/webauthn/register/start";
    const isWebauthnRegisterFinish = req.method === "POST" && pathname === "/auth/webauthn/register/finish";
    const isStaticAsset = pathname.startsWith("/static/");
    const isAuthEndpoint = isAuthVerify ||
        isWebauthnLoginStart ||
        isWebauthnLoginFinish ||
        isWebauthnRegisterStart ||
        isWebauthnRegisterFinish;
    return {
        isGetOrHead,
        isLoginPage: isGetOrHead && (pathname === "/login" || pathname === "/login.html"),
        isAuthVerify,
        isWebauthnLoginStart,
        isWebauthnLoginFinish,
        isWebauthnRegisterStart,
        isWebauthnRegisterFinish,
        isWebauthnEnrollPage: isGetOrHead && pathname === "/auth/webauthn/enrol",
        isInternalPost: req.method === "POST" && pathname === "/internal/post",
        isInternalPatch: req.method === "PATCH" && pathname.startsWith("/post/"),
        isIndex: isGetOrHead && (pathname === "/" || pathname === "/index.html"),
        isManifest: isGetOrHead && pathname === "/manifest.json",
        isFavicon: isGetOrHead && pathname === "/favicon.ico",
        isAppleIcon: isGetOrHead && APPLE_ICON_PATHS.has(pathname),
        isStaticAsset,
        isPublicStatic: isStaticAsset && isPublicStaticPath(pathname),
        isDocsAsset: pathname.startsWith("/docs/"),
        isAvatar: isGetOrHead && pathname === "/avatar/agent",
        isMutating: req.method === "POST" || req.method === "PUT" || req.method === "DELETE" || req.method === "PATCH",
        isAuthEndpoint,
    };
}
/**
 * Public unauthenticated endpoints/assets when auth is enabled.
 */
export function shouldSkipAuthCheck(flags, hasInternalAccess) {
    return (hasInternalAccess ||
        flags.isLoginPage ||
        flags.isAuthVerify ||
        flags.isWebauthnLoginStart ||
        flags.isWebauthnLoginFinish ||
        flags.isWebauthnRegisterStart ||
        flags.isWebauthnRegisterFinish ||
        flags.isManifest ||
        flags.isFavicon ||
        flags.isAppleIcon ||
        flags.isPublicStatic ||
        flags.isAvatar);
}
