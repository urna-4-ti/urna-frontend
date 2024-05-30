import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(res: Request) {
	const cookieStore = cookies();

	cookieStore.delete("token");
	if (cookieStore.has("access_token")) cookieStore.delete("access_token");

	return NextResponse.redirect(new URL("/login", res.url));
}
