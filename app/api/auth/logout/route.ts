import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
