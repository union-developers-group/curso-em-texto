import { LessonModelData } from '@/data/models/Lesson';

export interface CreateLessonData {
  courseId: string;
  moduleId: string;
  title: string;
  content: string;
  order?: number;
  isPublished?: boolean;
}

export interface LessonRepository {
  create(data: CreateLessonData): Promise<LessonModelData>;
}
