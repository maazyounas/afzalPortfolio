import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_me";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  async function isValidAdminToken(value?: string) {
    if (!value) return false;

    try {
      await jwtVerify(value, secret);
      return true;
    } catch (error) {
      console.error("JWT Verification failed:", error);
      return false;
    }
  }

  if (pathname === "/admin/login") {
    if (await isValidAdminToken(token)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!(await isValidAdminToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
