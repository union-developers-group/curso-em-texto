import { db, modulesTable } from '@/data';
import { eq } from 'drizzle-orm';

import type { ModuleModelData } from '@/data/models/Module';

import type {
  CreateModuleData,
  ModuleRepository,
} from '../../interfaces/ModuleRepository';

export class ModuleRepositoryImp implements ModuleRepository {
  async create(data: CreateModuleData): Promise<ModuleModelData> {
    const [result] = await db.insert(modulesTable).values(data).returning();

    return result;
  }

  async findById(id: string): Promise<ModuleModelData | null> {
    const [result] = await db
      .select()
      .from(modulesTable)
      .where(eq(modulesTable.id, id))
      .limit(1);

    return result ?? null;
  }

  async findByCourseId(courseId: string): Promise<ModuleModelData[]> {
    const result = await db
      .select()
      .from(modulesTable)
      .where(eq(modulesTable.courseId, courseId));

    return result;
  }

  async update(
    id: string,
    data: Partial<ModuleModelData>
  ): Promise<ModuleModelData> {
    const [result] = await db
      .update(modulesTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(modulesTable.id, id))
      .returning();

    return result;
  }

  async delete(id: string): Promise<void> {
    await db.delete(modulesTable).where(eq(modulesTable.id, id));
  }
}
