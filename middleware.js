import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
