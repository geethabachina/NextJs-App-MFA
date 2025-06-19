import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function MfaPage() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  try {
    const res = await fetch('/api/verifyMfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, code }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      // 1. Show success message
      alert('Login successful');
      // 2. Simulate session storage
      localStorage.setItem('token', 'mock-jwt-token');
      // 3. Redirect to dashboard
      //router.push('/dashboard');
      router.push('/transactions');
    } else {
      setError(data.message || 'Invalid code.');
    }
  } catch {
    setError('Network error.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f0f4ff 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2.5rem 2rem',
          borderRadius: 12,
          boxShadow: '0 4px 32px #0002',
          minWidth: 340,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}
      >
        <h2 style={{ margin: 0, textAlign: 'center', color: '#222', fontWeight: 700 }}>Multi-Factor Authentication</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            padding: '0.7rem',
            borderRadius: 6,
            border: '1px solid #d1d5db',
            fontSize: 16,
            outline: 'none',
          }}
          required
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          placeholder="6-digit code"
          value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
          style={{
            padding: '0.7rem',
            borderRadius: 6,
            border: '1px solid #d1d5db',
            fontSize: 22,
            letterSpacing: 6,
            textAlign: 'center',
            outline: 'none',
            margin: '0.5rem 0',
          }}
          required
        />
        {error && (
          <div style={{
            color: '#e11d48',
            background: '#fef2f2',
            borderRadius: 6,
            padding: '0.5rem 0.8rem',
            fontSize: 14,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.8rem',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 8,
            boxShadow: '0 2px 8px #6366f133'
          }}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
}