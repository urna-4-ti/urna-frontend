import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const existingToken = await request.cookies.get("access_token");

	if (existingToken) {
		console.log("cookie exists");
		return NextResponse.next();
	}

	const accessToken = request.nextUrl.searchParams.get("access_token");
	if (accessToken) {
		const queryParams = request.nextUrl.searchParams;
		const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set expiration in 7 days

		return NextResponse.next().cookies.set({
			name: "access_token",
			value: request.nextUrl.searchParams.get("access_token") as string,
			expires,
		});
	}

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: "/admin/:path*",
};
