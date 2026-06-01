'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AuthService } from '@/services/auth';
import { Suspense, useEffect } from 'react';

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      AuthService.saveToken(token);
      router.replace('/');
      return;
    }

    router.replace('/auth/sign-in');
  }, [router, searchParams]);

  return <p>Autenticando...</p>;
};

const AuthCallbackPage = () => (
  <Suspense fallback={<p>Autenticando...</p>}>
    <AuthCallback />
  </Suspense>
);

export default AuthCallbackPage;
