/**
 * Simple preview password. When SITE_PASSWORD is set (on Vercel), visitors
 * enter it once on /unlock and a cookie keeps them signed in. Locally it's
 * unset, so nothing is asked.
 */
export const ACCESS_COOKIE = "provident-access";

/** The cookie holds a hash of the password, never the password itself. */
export async function accessToken(password: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`provident-preview:${password}`));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** Only same-site paths, so the unlock form can't be used to send people elsewhere. */
export function safeNext(next: string | null | undefined) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/review";
}
