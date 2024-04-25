import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	if (await request.cookies.get("access_token")) {
		console.log("cookie exists");

		return NextResponse.next();
	}
	if (request.nextUrl.searchParams.get("access_token")) {
		const queryParams = request.nextUrl.searchParams;
		request.cookies.set(
			"access_token",
			queryParams.get("access_token") as string,
		);
		request.nextUrl.searchParams.delete("access_token");
		return NextResponse.next();
	}
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/admin/:path*",
};
