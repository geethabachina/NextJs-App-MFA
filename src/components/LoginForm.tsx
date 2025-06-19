import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'username' | 'password'>('username');
  const [username, setUsername] = useState('');
  const [secureWord, setSecureWord] = useState('');
  const [expiresIn, setExpiresIn] = useState(60);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Timer for secure word expiry
  React.useEffect(() => {
    if (step === 'password' && expiresIn > 0) {
      const timer = setInterval(() => setExpiresIn(e => e - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, expiresIn]);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/getSecureWord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setSecureWord(data.secureWord);
      setExpiresIn(data.expiresIn || 60);
      setStep('password');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    }
  };

// Helper to hash password using SHA-256
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const handlePasswordSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const hashedPassword = await hashPassword(password);
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, hashedPassword, secureWord }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error('Login failed' + `: ${data.message} `);
    }else{
        const data = await response.json();
        console.log('Login successful:', data);
        router.push('/mfa');
    }
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred');
    }
  }
};

return (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #f0f4ff 0%, #e0e7ff 100%)',
      borderRadius: 16,
      boxShadow: '0 4px 32px #0002',
      padding: '2rem 0',
    }}
  >
    <div
      style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: 12,
        minWidth: 340,
        boxShadow: '0 2px 16px #0001',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}
    >
      <h2 style={{ margin: 0, textAlign: 'center', color: '#222', fontWeight: 700 }}>
        Login
      </h2>

      {step === 'username' && (
        <form onSubmit={handleUsernameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <label style={{ fontSize: 15, color: '#555', marginBottom: 6 }}>
            Username
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                marginTop: 6,
                padding: '0.7rem',
                borderRadius: 6,
                border: '1px solid #d1d5db',
                fontSize: 15,
                outline: 'none',
                width: '100%',
                transition: 'border 0.2s',
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.8rem',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              marginTop: 8,
              boxShadow: '0 2px 8px #6366f133',
            }}
          >
            Get Secure Word
          </button>
          {error && (
            <div
              style={{
                color: '#e11d48',
                background: '#fef2f2',
                borderRadius: 6,
                padding: '0.5rem 0.8rem',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 8,
              }}
            >
              {error}
            </div>
          )}
        </form>
      )}

      {step === 'password' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              background: '#f1f5ff',
              borderRadius: 6,
              padding: '0.7rem 1rem',
              color: '#2563eb',
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 4,
              textAlign: 'center',
            }}
          >
            <strong>Secure Word:</strong> {secureWord}
          </div>
          <div style={{ color: '#eab308', textAlign: 'center', fontSize: 14, marginBottom: 8 }}>
            This secure word will expire in <b>{expiresIn}</b> seconds!
          </div>
          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ fontSize: 15, color: '#555', marginBottom: 6 }}>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  marginTop: 6,
                  padding: '0.7rem',
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  fontSize: 15,
                  outline: 'none',
                  width: '100%',
                  transition: 'border 0.2s',
                }}
              />
            </label>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.8rem',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                marginTop: 8,
                boxShadow: '0 2px 8px #6366f133',
              }}
            >
              Login
            </button>
          </form>
          {error && (
            <div
              style={{
                color: '#e11d48',
                background: '#fef2f2',
                borderRadius: 6,
                padding: '0.5rem 0.8rem',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 8,
              }}
            >
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
};

export default LoginForm;