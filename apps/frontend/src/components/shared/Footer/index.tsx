import { cn } from '@/utils/cn';
import Link from 'next/link';

export interface FooterProps {
  className?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: 'Início', href: '/' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Privacidade', href: '/privacidade' },
];

export const Footer = ({ className }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'w-full border-t border-background-200 bg-background-500',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
        <Link href="/" className="text-gradient-primary text-xl font-bold">
          Curso em Texto
        </Link>

        <nav
          aria-label="Navegação do rodapé"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md p-2 font-medium text-gray-200 transition-all hover:text-gray-50 focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <hr className="border-background-200" />

      <p className="px-6 py-6 text-center text-sm text-gray-100">
        © {year} Curso em Texto. Todos os direitos reservados.
      </p>
    </footer>
  );
};
