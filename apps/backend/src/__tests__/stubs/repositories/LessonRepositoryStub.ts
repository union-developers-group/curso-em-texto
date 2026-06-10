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

export class LessonRepositoryStub implements LessonRepository {
  async create(_: CreateLessonData): Promise<LessonModelData> {
    return lessonDataMock;
  }
}
