import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET;

async function verifyJWT(token: string, secret: string) {
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered:", req.nextUrl.pathname);

  if (!SECRET_KEY) {
    console.error("JWT secret is not set");
    return NextResponse.redirect(
      new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url)
    );
  }

  const token = req.cookies.get("tulparToken")?.value;

  if (!token) {
    console.log("No token found");
    return NextResponse.redirect(
      new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url)
    );
  }

  const decoded = await verifyJWT(token, SECRET_KEY);

  if (!decoded) {
    console.log("Token verification failed");
    return NextResponse.redirect(
      new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url)
    );
  }

  if (!decoded.isAdmin) {
    console.log("User is not an admin");
    return NextResponse.redirect(
      new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url)
    );
  }

  console.log("Decoded payload:", decoded);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
