import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(res: Request) {
	const cookieStore = cookies();

	cookieStore.delete("token");

	return NextResponse.redirect(new URL("/about", res.url));
}
