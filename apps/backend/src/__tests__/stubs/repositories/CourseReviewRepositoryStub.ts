import type { CourseReviewModelData } from '@/data/models/CourseReview';

import type {
  CreateCourseReviewData,
  CourseReviewRepository,
} from '@/data/repositories/interfaces/CourseReviewRepository';

import { courseDataMock } from './CourseRepositoryStub';

export const courseReviewDataMock: CourseReviewModelData = {
  id: crypto.randomUUID(),
  courseId: courseDataMock.id,
  adminId: crypto.randomUUID(),
  status: 'rejected',
  feedback: 'A dificuldade e duração do curso precisa ser alterada.',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const manyCourseReviewDataMock: CourseReviewModelData[] = [
  { ...courseReviewDataMock },
  {
    id: crypto.randomUUID(),
    courseId: courseDataMock.id,
    adminId: crypto.randomUUID(),
    status: 'rejected',
    feedback: 'A dificuldade foi alterada, porém a duração não, favor revisar.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    courseId: crypto.randomUUID(),
    adminId: crypto.randomUUID(),
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class CourseReviewRepositoryStub implements CourseReviewRepository {
  async create(data: CreateCourseReviewData): Promise<CourseReviewModelData> {
    return {
      ...courseReviewDataMock,
      ...data,
      feedback: data.feedback,
    };
  }

  async findById(id: string): Promise<CourseReviewModelData | null> {
    return manyCourseReviewDataMock.find((review) => review.id === id) ?? null;
  }

  async listByCourseId(courseId: string): Promise<CourseReviewModelData[]> {
    return manyCourseReviewDataMock.filter(
      (review) => review.courseId === courseId
    );
  }
}
