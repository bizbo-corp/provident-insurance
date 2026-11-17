import { NextResponse, type NextRequest } from "next/server";
import { VARIANT_COOKIE, VARIANT_HEADER } from "@/lib/variants";

/**
 * Client preview password. When SITE_PASSWORD is set (on Vercel), every page
 * and image asks for it through the browser's sign-in prompt. Any username
 * works. Locally it's unset, so nothing is asked.
 */
function isAuthorised(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return true;
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  const decoded = Buffer.from(header.slice(6), "base64").toString();
  return decoded.slice(decoded.indexOf(":") + 1) === password;
}

/** Lets a `?v=` link set the before/after state, and remembers it in a cookie. */
export function proxy(request: NextRequest) {
  // Site images and fonts are copies of the public live site, and Next's image
  // optimiser fetches them without the visitor's password, so they stay open.
  const publicAsset = /^\/(images|fonts)\//.test(request.nextUrl.pathname);
  if (!publicAsset && !isAuthorised(request)) {
    return new NextResponse("Password required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Provident preview", charset="UTF-8"' },
    });
  }

  const value = request.nextUrl.searchParams.get("v");
  if (value === null) return NextResponse.next();

  const headers = new Headers(request.headers);
  headers.set(VARIANT_HEADER, value);
  const response = NextResponse.next({ request: { headers } });
  response.cookies.set(VARIANT_COOKIE, value, { path: "/", sameSite: "lax" });
  return response;
}

export const config = {
  // Everything except Next's own build files, so the password covers every page and the review screenshots.
  matcher: ["/((?!_next/static|_next/image|favicon).*)"],
};
