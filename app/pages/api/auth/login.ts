import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { username, password } = req.body;
  // credenciais de exemplo: user / password
  if (username === "user" && password === "password") {
    return res
      .status(200)
      .json({ token: "fake-jwt-token", user: { username } });
  }
  return res.status(401).json({ message: "Invalid credentials" });
}
