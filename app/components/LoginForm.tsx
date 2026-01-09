"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation.js";
import TextInput from "./TextInput.js";
import { login } from "@services/auth.js";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({ username, password });
      if (typeof window !== "undefined") {
        localStorage.setItem("nm_token", data.token);
      }
      router.push("/dashboard");
    } catch {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="login-form shadow rounded p-6 flex flex-col gap-6 max-w-md mx-auto"
    >
      <h1 className="text-2xl font-bold text-center mb-4 text-primary-variant">Acesse sua conta</h1>
      <p className="text-center text-gray-500 mb-4">
        Bem-vindo de volta! Faça login para continuar.
      </p>

      <div className="flex flex-col gap-6">
        <TextInput
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=""
        />
        <TextInput
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
        />
      </div>

      {error && <p className="error text-red-600 text-sm text-center mt-2">{error}</p>}

      <button
        type="submit"
        className="btn font-semibold rounded btn-dark px-4 py-2 mt-2 w-full"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
