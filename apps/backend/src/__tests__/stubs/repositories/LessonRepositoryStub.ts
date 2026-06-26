import type { LessonModelData } from '@/data/models/Lesson';

import type {
  CreateLessonData,
  LessonRepository,
} from '@/data/repositories/interfaces/LessonRepository';

export const lessonDataMock: LessonModelData = {
  id: crypto.randomUUID(),
  courseId: crypto.randomUUID(),
  moduleId: crypto.randomUUID(),
  title: 'Lição 1 - Começando em Programação Assíncrona',
  content:
    'A programação assíncrona é uma técnica que permite iniciar uma tarefa e realizar outras operações imediatamente, em paralelo com a primeira tarefa.',
  order: 0,
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const lessonManyDataMock: LessonModelData[] = [
  { ...lessonDataMock },
  {
    id: crypto.randomUUID(),
    courseId: crypto.randomUUID(),
    moduleId: crypto.randomUUID(),
    title: 'Lição 1 - Começando em Node.js',
    content:
      'O Node.js é um ambiente de execução de código aberto que permite aos desenvolvedores executar código JavaScript fora de um navegador.',
    order: 0,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class LessonRepositoryStub implements LessonRepository {
  async create(_: CreateLessonData): Promise<LessonModelData> {
    return lessonDataMock;
  }

  async findById(id: string): Promise<LessonModelData | null> {
    return lessonManyDataMock.find((lesson) => lesson.id === id) || null;
  }

  async findByModuleId(moduleId: string): Promise<LessonModelData[]> {
    return lessonManyDataMock.filter((lesson) => lesson.moduleId === moduleId);
  }

  async update(
    _: string,
    __: Partial<LessonModelData>
  ): Promise<LessonModelData> {
    return Promise.resolve(lessonDataMock);
  }

  async delete(_: string): Promise<void> {
    return;
  }
}
