import { NextRequest, NextResponse } from "next/server";
import useCheckAdmin from "./hooks/useCheckAdmin";

export async function middleware(req: NextRequest) {
  const checkAdmin = await useCheckAdmin();

  if (!checkAdmin.isOk) {
    console.log(checkAdmin.error);

    return NextResponse.redirect(
      new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url)
    );
  }

  console.log("Decoded payload:", checkAdmin.decoded);
  return NextResponse.next();
}

export const config = {
  matcher: ["/a/:path*", "/admin/:path*", "/ad/:path*"],
};
