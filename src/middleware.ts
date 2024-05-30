import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	if (request.cookies.has("token")) {
		console.log("has token");

		return NextResponse.next();
	}
	const url = request.nextUrl;
	const accessToken = url.searchParams.get("access_token");

	if (accessToken) {
		const response = NextResponse.next();
		response.cookies.set("token", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7,
		});

		url.searchParams.delete("access_token");
		const newUrl = url.toString();

		return NextResponse.redirect(new URL(newUrl));
	}
	console.log("all failed, to login");

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: "/admin/:path*",
};
