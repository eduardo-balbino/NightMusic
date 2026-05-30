import { NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_URL ?? "http://localhost:3000";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, displayName } = body;

    const response = await fetch(`${backendBaseUrl}/users/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, displayName }),
      cache: "no-store",
    });

    const payload = await response.json();

    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }
}
