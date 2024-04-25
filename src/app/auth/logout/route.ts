import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(res: Request) {
	cookies().delete("access_token");
	console.log(new URL("/", res.url));

	return NextResponse.redirect(new URL("/login", res.url));
}
