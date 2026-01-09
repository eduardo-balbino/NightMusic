"use client";

import React, { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email.trim()) {
      setError("Informe seu e-mail");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Informe um e-mail válido");
      return false;
    }
    setError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      // Chamar API de recuperação de senha se existir.
      // Ex: await fetch('/api/auth/forgot', { method: 'POST', body: JSON.stringify({ email }) })
      setMessage("Se o e-mail existir, você receberá instruções para resetar a senha.");
    } catch {
      setError("Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="forgot-form shadow rounded p-6 flex flex-col gap-6" onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold text-gray-700 text-center">Recuperar senha</h1>

      <label className="text-sm">E-mail</label>
      <input
        type="email"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <div className="error text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        className="btn font-semibold rounded btn-dark px-4 py-2"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar link de recuperação"}
      </button>

      {message && <div className="text-green-600 text-sm">{message}</div>}
    </form>
  );
}
