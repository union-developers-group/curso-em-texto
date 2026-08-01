import type {
  CourseReviewModelData,
  CourseReviewStatus,
} from '@/data/models/CourseReview';

export interface CreateCourseReviewData {
  id: string;
  courseId: string;
  adminId: string;
  status: CourseReviewStatus;
  feedback?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseReviewRepository {
  create(data: CreateCourseReviewData): Promise<CourseReviewModelData>;
  findById(id: string): Promise<CourseReviewModelData | null>;
  listByCourseId(courseId: string): Promise<CourseReviewModelData[]>;
}
