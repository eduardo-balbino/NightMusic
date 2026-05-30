type LoginCreds = { email: string; password: string };
type RegisterCreds = { email: string; password: string; displayName: string };
type AuthUser = { id: string; email: string; displayName: string };
type LoginResponse = { token: string; user: AuthUser };

export async function login(creds: LoginCreds): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.message || "Unauthorized");
  }

  return payload;
}

export async function register(creds: RegisterCreds) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.message || "Registration failed");
  }

  return payload;
}

export async function logout() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // ignore
  }
}
