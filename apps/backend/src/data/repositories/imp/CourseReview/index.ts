import { courseReviewsTable, db } from '@/data';
import { eq } from 'drizzle-orm';

import type { CourseReviewModelData } from '@/data/models/CourseReview';

import type {
  CourseReviewRepository,
  CreateCourseReviewData,
} from '../../interfaces/CourseReviewRepository';

export class CourseReviewRepositoryImp implements CourseReviewRepository {
  async create(data: CreateCourseReviewData): Promise<CourseReviewModelData> {
    const [result] = await db
      .insert(courseReviewsTable)
      .values(data)
      .returning();

    return result;
  }

  async findById(id: string): Promise<CourseReviewModelData | null> {
    const [result] = await db
      .select()
      .from(courseReviewsTable)
      .where(eq(courseReviewsTable.id, id))
      .limit(1);

    return result ?? null;
  }

  async listByCourseId(courseId: string): Promise<CourseReviewModelData[]> {
    const result = await db
      .select()
      .from(courseReviewsTable)
      .where(eq(courseReviewsTable.courseId, courseId));

    return result;
  }
}
