import { coursesTable, usersTable, db } from '@/data';
import { and, eq } from 'drizzle-orm';

import type { CourseModelData } from '@/data/models/Course';
import { UserModelData } from '@/data/models/User';
import type {
  CourseRepository,
  CreateCourseData,
  UpdateCourseDetailsData,
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

  async findById(courseId: string): Promise<CourseModelData | null> {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId))
      .limit(1);

    return result[0] ?? null;
  }

  async findByIdAndAuthorId(
    courseId: string,
    authorId: string
  ): Promise<CourseModelData | null> {
    const result = await db
      .select()
      .from(coursesTable)
      .where(
        and(eq(coursesTable.id, courseId), eq(coursesTable.authorId, authorId))
      )
      .limit(1);

    return result[0] ?? null;
  }

  async updateDetails(
    courseId: string,
    data: UpdateCourseDetailsData
  ): Promise<CourseModelData> {
    const [result] = await db
      .update(coursesTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(coursesTable.id, courseId))
      .returning();

    return result;
  }
}
