'use client';

import { useAuth } from '@/contexts/AuthContext';

const SignInPage = () => {
  const { login } = useAuth();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <button onClick={() => login('google')}>Continuar com o Google</button>
      <button onClick={() => login('github')}>Continuar com o GitHub</button>
    </div>
  );
};

export default SignInPage;
