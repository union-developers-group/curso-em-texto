import type {
  CourseDifficulty,
  CourseModelData,
  CourseStatus,
} from '@/data/models/Course';
import { UserModelData } from '@/data/models/User';

export interface CreateCourseData {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  authorId: string;
  tags?: string[];
  difficulty?: CourseDifficulty;
  estimatedHours?: number;
  status?: CourseStatus;
  isPublic?: boolean;
}

export interface CourseRepository {
  create(data: CreateCourseData): Promise<CourseModelData>;
  findAuthorById(authorId: string): Promise<UserModelData | null>;
  findBySlug(slug: string): Promise<CourseModelData | null>;
}
