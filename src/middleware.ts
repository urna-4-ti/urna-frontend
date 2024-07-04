import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	if (request.cookies.has("token")) {
		console.log("has token");

		return NextResponse.next();
	}
	// const url = request.nextUrl;
	// const accessToken = url.searchParams.get("access_token");

	// if (accessToken) {
	// 	const urlWithoutToken = new URL(request.url);
	// 	urlWithoutToken.searchParams.delete("access_token");

	// 	const rewriteResponse = NextResponse.rewrite(urlWithoutToken);

	// 	const cookieStorage = cookies();
	// 	cookieStorage.set("token", accessToken, {
	// 		httpOnly: true,
	// 		secure: process.env.NODE_ENV === "production",
	// 		maxAge: 60 * 60 * 24 * 7,
	// 	});

	// 	return rewriteResponse;
	// }

	console.log("all failed, to login");

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: ["/admin/:path*", "/election/:path*"],
};
