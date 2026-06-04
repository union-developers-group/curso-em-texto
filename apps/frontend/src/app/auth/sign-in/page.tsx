'use client';

import { SignInTemplate } from '@/templates/auth/SignInTemplate';
import { useAuth } from '@/contexts/AuthContext';

const SignInPage = () => {
  const { login } = useAuth();

  return <SignInTemplate onSignIn={login} />;
};

export default SignInPage;
