import { BookOpen, Clock, Sparkles } from 'lucide-react';

import { HighlightCardProps } from '@/components/shared/HighlightCard';

type HighlightCardMock = Omit<HighlightCardProps, 'size' | 'className'>;

export const highlightCardMock: HighlightCardMock = {
  icon: Clock,
  title: 'Aprenda no Seu Próprio Ritmo',
  description:
    'Sem linhas do tempo de vídeo ou pressa. Leia, absorva e pratique no ritmo que funciona para você.',
};

export const highlightCardMocks: HighlightCardMock[] = [
  highlightCardMock,
  {
    icon: BookOpen,
    title: 'Conteúdo Focado',
    description:
      'Nossos cursos eliminam distrações e focam em conteúdo bem escrito e completo.',
  },
  {
    icon: Sparkles,
    title: 'Retenha Conhecimento',
    description:
      'Estudos mostram que a leitura melhora a compreensão e a retenção a longo prazo em comparação com vídeos.',
  },
];
