import type {
  CourseReviewModelData,
  CourseReviewStatus,
} from '@/data/models/CourseReview';

export interface CreateCourseReviewData {
  courseId: string;
  adminId: string;
  status: CourseReviewStatus;
  feedback?: string | null;
}

export interface CourseReviewRepository {
  create(data: CreateCourseReviewData): Promise<CourseReviewModelData>;
  findById(id: string): Promise<CourseReviewModelData | null>;
  listByCourseId(courseId: string): Promise<CourseReviewModelData[]>;
}
