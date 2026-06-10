import { db, lessonsTable } from '@/data';

import type { LessonModelData } from '@/data/models/Lesson';

import type {
  LessonRepository,
  CreateLessonData,
} from '../../interfaces/LessonRepository';

export class LessonRepositoryImp implements LessonRepository {
  async create(data: CreateLessonData): Promise<LessonModelData> {
    const [result] = await db.insert(lessonsTable).values(data).returning();

    return result;
  }
}
