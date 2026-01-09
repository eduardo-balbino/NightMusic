import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;
    if (username === "user" && password === "password") {
      return NextResponse.json({ token: "fake-jwt-token", user: { username } }, { status: 200 });
    }
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }
}
