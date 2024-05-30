import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(req: Request) {
	const cookieStore = cookies();

	const url = new URL(req.url);

	const accessToken = url.searchParams.get("access_token") as string;

	cookieStore.set("token", accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7,
	});

	return NextResponse.redirect(new URL("/admin/dashboard", req.url));
}
