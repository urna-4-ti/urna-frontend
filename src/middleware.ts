import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	if (request.cookies.has("token")) {
		console.log("has token");

		return NextResponse.next();
	}

	const url = request.nextUrl;
	const queryParams = url.searchParams;
	const token = queryParams.get("access_token");

	if (token) {
		queryParams.delete("access_token");

		response.cookies.set({
			name: "token",
			value: token,
			maxAge: 60 * 60 * 24 * 7, // 7 days
		});

		console.log("You passed");

		return response;
	}
	console.log("all failed, to login");

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: "/admin/:path*",
};
