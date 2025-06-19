import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';
import { login } from '../lib/mockapi';

const LoginPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (username, password) => {
    const result = await login(username, password);
    console.log('login result:', result); 
    if (result.success) {
      router.push('/mfa');
    } else {
      setError(result.message || 'An unknown error occurred.');
    }
  };

  return (
    <div>
      {/* <h1>Login</h1> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;