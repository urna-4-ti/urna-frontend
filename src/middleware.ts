import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";

// This function can be marked async if using await inside
export async function middleware(request: NextRequest) {
	if (await request.cookies.get("access_token")) {
		console.log("cookie exists");

		return NextResponse.next();
	}
	if (request.nextUrl.searchParams.get("access_token")) {
		const queryParams = request.nextUrl.searchParams;
		cookies().set({
			name: "access_token",
			value: queryParams.get("access_token") as string,
			expires: 604800000, // 7 days
		});
		request.nextUrl.searchParams.delete("access_token");
		return NextResponse.next();
	}
	return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/admin/:path*",
};
