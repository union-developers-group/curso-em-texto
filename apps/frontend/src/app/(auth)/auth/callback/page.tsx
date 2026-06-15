'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Loading } from '@/components/ui/Loading';
import { AuthService } from '@/services/auth';
import { Suspense, useEffect } from 'react';

const AuthCallbackLoading = () => (
  <main className="flex min-h-screen items-center justify-center bg-background-500">
    <Loading size="lg" color="#10B77F" />
  </main>
);

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      AuthService.saveToken(token);
      router.replace('/');
      return;
    }

    router.replace('/login');
  }, [router, token]);

  return <AuthCallbackLoading />;
};

const AuthCallbackPage = () => (
  <Suspense fallback={<AuthCallbackLoading />}>
    <AuthCallback />
  </Suspense>
);

export default AuthCallbackPage;
