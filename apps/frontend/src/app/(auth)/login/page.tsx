'use client';

import { SignInTemplate } from '@/templates/auth/SignInTemplate';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  return <SignInTemplate onSignIn={login} />;
};

export default LoginPage;
