import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <div>
      <h1>Welcome to the Login MFA App</h1>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default Home;