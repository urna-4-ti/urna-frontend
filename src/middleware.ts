import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	if (request.cookies.has("token")) {
		console.log("has token");

		return NextResponse.next();
	}
	console.log("all failed, to login");

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: "/admin/:path*",
};
