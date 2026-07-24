export type CourseReviewStatus = 'approved' | 'rejected';

export interface CourseReviewModelData {
  id: string;
  courseId: string;
  adminId: string;
  status: string;
  feedback?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
