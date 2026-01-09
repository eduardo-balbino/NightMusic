'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation.js';
import TextInput from './TextInput.js';
import { login } from '@services/auth.js';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login({ username, password });
      if (typeof window !== 'undefined') {
        localStorage.setItem('nm_token', data.token);
      }
      router.push('/dashboard');
    } catch {
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form shadow rounded p-6 flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-gray-700 text-center">Entrar</h1>
      <TextInput
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-3"
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3"
      />
      {error && <p className="error text-red-600 text-sm text-center">{error}</p>}
      <button
        type="submit"
        className="btn font-semibold rounded btn-dark px-4 py-2"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
