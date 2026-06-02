import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Button } from '@/components/ui/Button';
import { OAuthProvider } from '@/services/auth';
import { Github, Monitor } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface SignInTemplateProps {
  onSignIn: (provider: OAuthProvider) => void;
}

const SignInTemplate = ({ onSignIn }: SignInTemplateProps) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background-500 p-6 lg:flex-row lg:px-16">
      <div className="relative order-first h-[350px] w-full max-w-[600px] lg:order-last lg:-ml-[60px] lg:mt-[50px] lg:h-[820px] lg:w-[1040px]">
        <Image
          src="/login-image.png"
          alt="Ilustração do Curso em Texto"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1040px"
          className="-translate-y-[50px] object-contain lg:translate-y-0"
        />
      </div>

      <section className="relative z-10 -mt-[100px] flex w-full max-w-[644px] flex-col gap-8 rounded-2xl border border-background-200 bg-background-400/50 p-8 shadow-sm backdrop-blur-sm lg:mt-0 lg:h-[608px] lg:w-[560px] lg:shrink-0 lg:gap-20 lg:px-20 lg:py-20">
        <div className="flex items-center justify-center gap-2">
          <Monitor size={24} className="text-[#3C83F6]" />
          <span className="text-gradient-primary font-bold text-3xl">
            Curso em Texto
          </span>
        </div>

        <h1 className="text-center text-2xl font-bold text-gray-50">
          Faça login ou inscreva-se
        </h1>

        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            icon={<Github size={18} />}
            iconPosition="left"
            className="w-full"
            onClick={() => onSignIn('github')}
          >
            Continuar com o GitHub
          </Button>

          <Button
            variant="secondary"
            icon={<GoogleIcon size={18} />}
            iconPosition="left"
            className="w-full"
            onClick={() => onSignIn('google')}
          >
            Continuar com o Google
          </Button>
        </div>

        <p className="text-center text-xs text-gray-200">
          Ao continuar, você concorda com os{' '}
          <Link
            href="/auth/terms"
            className="font-medium text-gray-100 underline"
          >
            Termos de Serviço
          </Link>{' '}
          e{' '}
          <Link
            href="/auth/privacy"
            className="font-medium text-gray-100 underline"
          >
            Política de Privacidade
          </Link>{' '}
          do Curso em Texto
        </p>
      </section>
    </main>
  );
};

export default SignInTemplate;
