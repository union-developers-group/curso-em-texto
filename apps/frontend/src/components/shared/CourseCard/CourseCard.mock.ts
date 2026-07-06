import { CourseCardProps } from '@/components/shared/CourseCard';

type CourseCardMock = Omit<CourseCardProps, 'className'>;

export const courseCardMock: CourseCardMock = {
  level: 'Iniciante',
  featuredLabel: 'Em destaque',
  title: 'JavaScript Fundamentals',
  author: 'Jane Smith',
  description:
    'Domine os fundamentos de JavaScript com conteúdo rico, cabeçalhos e trechos de código.',
  categories: ['Programming', 'Web Development'],
  duration: '8 horas',
  lessons: 4,
  progress: 25,
};

export const courseCardMocks: CourseCardMock[] = [
  courseCardMock,
  {
    level: 'Intermediário',
    title: 'React com TypeScript',
    author: 'John Doe',
    description:
      'Construa interfaces reutilizáveis com tipagem estática e boas práticas de componentes.',
    categories: ['React', 'TypeScript'],
    duration: '12 horas',
    lessons: 8,
    progress: 60,
  },
  {
    level: 'Avançado',
    featuredLabel: 'Novo',
    title: 'Arquitetura Front-end',
    author: 'Maria Silva',
    description:
      'Organize aplicações modernas com padrões claros, testes e separação de responsabilidades.',
    categories: ['Architecture', 'Testing'],
    duration: '16 horas',
    lessons: 10,
    progress: 0,
  },
];
