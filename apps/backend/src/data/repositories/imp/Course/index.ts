import { coursesTable, usersTable, db } from '@/data';
import { eq } from 'drizzle-orm';

import type { CourseModelData } from '@/data/models/Course';
import { UserModelData } from '@/data/models/User';
import type {
  CourseRepository,
  CreateCourseData,
} from '@/data/repositories/interfaces/CourseRepository';

export class CourseRepositoryImp implements CourseRepository {
  async create(data: CreateCourseData): Promise<CourseModelData> {
    const [result] = await db.insert(coursesTable).values(data).returning();

    return result;
  }

  async findAuthorById(authorId: string): Promise<UserModelData | null> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, authorId))
      .limit(1);

    return result[0] ?? null;
  }

  async findBySlug(slug: string): Promise<CourseModelData | null> {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.slug, slug))
      .limit(1);

    return result[0] ?? null;
  }
}
