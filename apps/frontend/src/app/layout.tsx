import AuthProvider from '@/contexts/AuthContext';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const inter = Inter({
  variable: '--font-inter-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Curso em Texto',
  description: 'Curso em Texto.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable}  antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
