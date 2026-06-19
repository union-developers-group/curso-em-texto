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
  findById(id: string): Promise<LessonModelData | null>;
  findByModuleId(moduleId: string): Promise<LessonModelData[]>;
  update(id: string, data: Partial<LessonModelData>): Promise<LessonModelData>;
  delete(id: string): Promise<void>;
}
