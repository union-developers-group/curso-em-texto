import { db, lessonsTable } from '@/data';

import type { LessonModelData } from '@/data/models/Lesson';

import type {
  LessonRepository,
  CreateLessonData,
} from '../../interfaces/LessonRepository';
import { eq } from 'drizzle-orm';

export class LessonRepositoryImp implements LessonRepository {
  async create(data: CreateLessonData): Promise<LessonModelData> {
    const [result] = await db.insert(lessonsTable).values(data).returning();

    return result;
  }

  async findById(id: string): Promise<LessonModelData | null> {
    const [result] = await db
      .select()
      .from(lessonsTable)
      .where(eq(lessonsTable.id, id))
      .limit(1);

    return result ?? null;
  }

  async findByModuleId(moduleId: string): Promise<LessonModelData[]> {
    const result = await db
      .select()
      .from(lessonsTable)
      .where(eq(lessonsTable.moduleId, moduleId));

    return result;
  }

  async update(
    id: string,
    data: Partial<LessonModelData>
  ): Promise<LessonModelData> {
    const [result] = await db
      .update(lessonsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(lessonsTable.id, id))
      .returning();

    return result;
  }

  async delete(id: string): Promise<void> {
    await db.delete(lessonsTable).where(eq(lessonsTable.id, id));
  }
}
