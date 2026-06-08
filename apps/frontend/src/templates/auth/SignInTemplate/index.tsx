import { Button } from '@/components/ui/Button';
import { OAuthProvider } from '@/services/auth';
import Image from 'next/image';
import Link from 'next/link';

export interface SignInTemplateProps {
  onSignIn: (provider: OAuthProvider) => void;
}

export const SignInTemplate = ({ onSignIn }: SignInTemplateProps) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background-500 p-6 lg:flex-row lg:px-16">
      <div className="relative order-first h-[21.875rem] w-full max-w-[37.5rem] lg:order-last lg:-ml-[3.75rem] lg:mt-[3.125rem] lg:h-[51.25rem] lg:w-[65rem]">
        <Image
          src="/login-image.png"
          alt="Ilustração do Curso em Texto"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1040px"
          className="-translate-y-[3.125rem] object-contain lg:translate-y-0"
        />
      </div>

      <section className="relative z-10 -mt-[6.25rem] flex w-full max-w-[40.25rem] flex-col gap-8 rounded-2xl border border-background-200 bg-background-400/50 p-8 shadow-sm backdrop-blur-sm lg:mt-0 lg:h-[38rem] lg:w-[35rem] lg:shrink-0 lg:gap-11 lg:px-20 lg:py-20">
        <div className="flex items-center justify-center">
          <span className="text-gradient-primary font-bold text-3xl">
            Curso em Texto
          </span>
        </div>

        <h1 className="text-center text-xl font-bold text-gray-50 md:text-2xl">
          Faça login ou inscreva-se
        </h1>

        <div className="flex flex-col gap-6">
          <Button
            variant="secondary"
            icon={<Image src="/mdi_github.svg" alt="" width={20} height={20} />}
            iconPosition="left"
            className="w-full"
            onClick={() => onSignIn('github')}
          >
            Continuar com o GitHub
          </Button>

          <Button
            variant="secondary"
            icon={
              <Image src="/ri_google-fill.svg" alt="" width={20} height={20} />
            }
            iconPosition="left"
            className="w-full"
            onClick={() => onSignIn('google')}
          >
            Continuar com o Google
          </Button>
        </div>

        <div className="flex w-full items-center justify-center">
          <p className="max-w-[16.25rem] text-center text-sm text-gray-200 md:max-w-[22.1875rem]">
            Ao continuar, você concorda com os{' '}
            <Link
              href="/termos"
              className="font-medium text-gray-100 underline"
            >
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link
              href="/privacidade"
              className="font-medium text-gray-100 underline"
            >
              Política de Privacidade
            </Link>{' '}
            do Curso em Texto
          </p>
        </div>
      </section>
    </main>
  );
};
