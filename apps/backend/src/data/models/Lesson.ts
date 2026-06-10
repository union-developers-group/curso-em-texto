export interface LessonModelData {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
