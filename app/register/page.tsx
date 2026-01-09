"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const next: Record<string, string> = {};

    if (!name.trim()) {
      next["name"] = "this field is required";
    }

    if (!email.trim()) {
      next["email"] = "this field is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next["email"] = "write a valid email";
    }

    if (!password) {
      next["password"] = "this field is required";
    } else if (!/^.{8,}$/.test(password)) {
      next["password"] = "your password is too short";
    }

    if (!confirmPassword) {
      next["confirmPassword"] = "this field is required";
    } else if (confirmPassword !== password) {
      next["confirmPassword"] = "passwords don't match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      // Aqui você pode chamar a sua API de registro.
      // Exemplo: await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
      router.push("/login");
    } catch {
      setErrors({ form: "Erro ao registrar. Tente novamente." });
    }
  }

  return (
    <div className="center-wrapper">
      <h1>Sign Up</h1>

      <form className="form" id="register-form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="user-name">Name</label>
        <br />
        <input
          type="text"
          id="user-name"
          name="user-name"
          placeholder="enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <span className="error-msg" data-name="error">
            {errors.name}
          </span>
        )}
        <br />

        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="enter an email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <span className="error-msg" data-name="error">
            {errors.email}
          </span>
        )}
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="enter a password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <span className="error-msg" data-name="error">
            {errors.password}
          </span>
        )}
        <br />

        <label htmlFor="confirm-password">Confirm Password</label>
        <br />
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="enter your password again"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <span className="error-msg" data-name="error">
            {errors.confirmPassword}
          </span>
        )}
        <br />

        <button type="submit" className="submit-btn" id="submit-form">
          Sign Up
        </button>
        {errors.form && <div className="error-msg">{errors.form}</div>}
      </form>

      <small>
        Already have an account? <Link href="/login">Sign In</Link>
      </small>
    </div>
  );
}
