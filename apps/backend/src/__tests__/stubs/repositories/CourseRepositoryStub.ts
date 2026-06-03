import type { CourseModelData } from '@/data/models/Course';
import type { UserModelData } from '@/data/models/User';
import type {
  CourseRepository,
  CreateCourseData,
} from '@/data/repositories/interfaces/CourseRepository';

export const courseDataMock: CourseModelData = {
  id: '1234',
  title: 'JavaScript Moderno',
  slug: 'javascript-moderno',
  description:
    'Aprenda JavaScript do básico ao avançado com exemplos práticos e projetos reais que vão te preparar para o mercado de trabalho.',
  shortDescription:
    'Curso completo de JavaScript para iniciantes e intermediários',
  authorId: '5678',
  tags: ['javascript', 'programacao', 'web'],
  difficulty: 'beginner',
  estimatedHours: 40,
  status: 'draft',
  isPublic: false,
  enrollmentCount: 0,
  createdAt: new Date('2025-01-15T10:30:00Z'),
  updatedAt: new Date('2025-01-15T10:30:00Z'),
};

export const courseManyDataMock: CourseModelData[] = [
  { ...courseDataMock },
  {
    id: '5678',
    title: 'React Hooks Avançado',
    slug: 'react-hooks-avancado',
    description:
      'Domine os React Hooks e modernize suas aplicações React com as melhores práticas do mercado.',
    shortDescription: 'Curso avançado de React Hooks',
    authorId: '1234',
    tags: ['react', 'hooks', 'javascript'],
    difficulty: 'advanced',
    estimatedHours: 25,
    status: 'published',
    isPublic: true,
    enrollmentCount: 142,
    createdAt: new Date('2025-01-14T15:20:00Z'),
    updatedAt: new Date('2025-01-14T16:45:00Z'),
  },
];

export const courseAuthorMock: UserModelData = {
  id: courseDataMock.authorId,
  email: 'author@example.com',
  name: 'Course Author',
  role: 'teacher',
  isActive: true,
  createdAt: new Date('2025-01-15T10:30:00Z'),
  updatedAt: new Date('2025-01-15T10:30:00Z'),
};

export class CourseRepositoryStub implements CourseRepository {
  async findAuthorById(authorId: string): Promise<UserModelData | null> {
    return authorId === courseAuthorMock.id ? courseAuthorMock : null;
  }

  async findBySlug(slug: string): Promise<CourseModelData | null> {
    return courseManyDataMock.find((course) => course.slug === slug) || null;
  }

  async create(data: CreateCourseData): Promise<CourseModelData> {
    return {
      ...courseDataMock,
      ...data,
      shortDescription:
        data.shortDescription ?? courseDataMock.shortDescription,
      tags: data.tags ?? courseDataMock.tags,
      difficulty: data.difficulty ?? courseDataMock.difficulty,
      estimatedHours: data.estimatedHours ?? courseDataMock.estimatedHours,
      status: data.status ?? courseDataMock.status,
      isPublic: data.isPublic ?? courseDataMock.isPublic,
    };
  }
}
