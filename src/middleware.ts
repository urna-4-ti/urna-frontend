import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked async if using await inside
export async function middleware(request: NextRequest) {
	if (typeof window === "undefined") {
		return null;
	}
	const storage = JSON.parse(localStorage.getItem("auth") as string);
	if (storage?.state?.state?.user?.token) {
		NextResponse.next();
	}
	return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/admin/:path*",
};
