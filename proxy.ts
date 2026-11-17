import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken } from "@/lib/site-access";
import { VARIANT_COOKIE, VARIANT_HEADER } from "@/lib/variants";

/** True once the visitor has entered SITE_PASSWORD on /unlock (or when no password is set). */
async function isAuthorised(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return true;
  return request.cookies.get(ACCESS_COOKIE)?.value === (await accessToken(password));
}

/** Lets a `?v=` link set the before/after state, and remembers it in a cookie. */
export async function proxy(request: NextRequest) {
  // Site images and fonts are copies of the public live site, and Next's image
  // optimiser fetches them without the visitor's cookie, so they stay open.
  // The password page and its form handler must stay open too.
  const { pathname, search } = request.nextUrl;
  const open = /^\/(images|fonts)\//.test(pathname) || pathname === "/unlock" || pathname === "/api/unlock";
  if (!open && !(await isAuthorised(request))) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Password required" }, { status: 401 });
    const unlock = new URL("/unlock", request.url);
    unlock.searchParams.set("next", pathname + search);
    return NextResponse.redirect(unlock);
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
