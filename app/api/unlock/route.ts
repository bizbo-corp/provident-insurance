import { NextResponse } from "next/server";
import { ACCESS_COOKIE, accessToken, safeNext } from "@/lib/site-access";

/** Checks the preview password from the /unlock form and remembers it in a cookie for 30 days. */
export async function POST(request: Request) {
  const form = await request.formData();
  const next = safeNext(String(form.get("next") ?? ""));
  const password = process.env.SITE_PASSWORD;

  if (password && form.get("password") !== password) {
    const retry = new URL("/unlock", request.url);
    retry.searchParams.set("next", next);
    retry.searchParams.set("error", "1");
    return NextResponse.redirect(retry, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  if (password) {
    response.cookies.set(ACCESS_COOKIE, await accessToken(password), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return response;
}
