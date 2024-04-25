import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(req: Response) {
	cookies().delete("access_token");
	console.log(new URL("/", req.url));

	return NextResponse.redirect(new URL("/login", req.url));
}
