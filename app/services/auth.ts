type Creds = { username: string; password: string };

export async function login(creds: Creds) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}
