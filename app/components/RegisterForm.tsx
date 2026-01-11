"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: Record<string, string> = {};

    if (!name.trim()) {
      next["name"] = "Este campo é obrigatório";
    }

    if (!email.trim()) {
      next["email"] = "Este campo é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next["email"] = "Informe um e-mail válido";
    }

    if (!password) {
      next["password"] = "Este campo é obrigatório";
    } else if (!/^.{8,}$/.test(password)) {
      next["password"] = "A senha é muito curta (mínimo 8 caracteres)";
    }

    if (!confirmPassword) {
      next["confirmPassword"] = "Este campo é obrigatório";
    } else if (confirmPassword !== password) {
      next["confirmPassword"] = "As senhas não coincidem";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      // Chame a API de registro aqui.
      // Ex: await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
      router.push("/login");
    } catch {
      setErrors({ form: "Erro ao registrar. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="register-form shadow rounded p-6 flex flex-col gap-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className="text-xl font-semibold text-gray-700 text-center">Registrar</h1>

      <label className="text-sm">Nome</label>
      <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
      {errors.name && <span className="error text-red-600 text-sm">{errors.name}</span>}

      <label className="text-sm">E-mail</label>
      <input
        type="email"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span className="error text-red-600 text-sm">{errors.email}</span>}

      <label className="text-sm">Senha</label>
      <input
        type="password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <span className="error text-red-600 text-sm">{errors.password}</span>}

      <label className="text-sm">Confirmar senha</label>
      <input
        type="password"
        className="input-field"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errors.confirmPassword && (
        <span className="error text-red-600 text-sm">{errors.confirmPassword}</span>
      )}

      {errors.form && <div className="error text-red-600 text-sm">{errors.form}</div>}

      <button
        type="submit"
        className="btn font-semibold rounded btn-dark px-4 py-2"
        disabled={loading}
      >
<<<<<<< Updated upstream
        {loading ? "Registrando..." : "Criar conta"}
      </button>
    </form>
=======
        <h1 className="text-xl font-bold text-center">Registrar</h1>

        <label className="text-sm">Nome</label>
        <input
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <span className="error text-red-600 text-sm">{errors.name}</span>
        )}

        <label className="text-sm">E-mail</label>
        <input
          type="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <span className="error text-red-600 text-sm">{errors.email}</span>
        )}

        <label className="text-sm">Senha</label>
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <span className="error text-red-600 text-sm">{errors.password}</span>
        )}

        <label className="text-sm">Confirmar senha</label>
        <input
          type="password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <span className="error text-red-600 text-sm">
            {errors.confirmPassword}
          </span>
        )}

        {errors.form && (
          <div className="error text-red-600 text-sm">{errors.form}</div>
        )}

        <button
          type="submit"
          className="btn font-semibold rounded px-4 py-2"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Criar conta"}
        </button>
      </form>
      <small className="text-center small">
        Já possui uma conta?{" "}
        <Link href="/login" className="link">
          Faça o login
        </Link>
      </small>
    </>
>>>>>>> Stashed changes
  );
}
