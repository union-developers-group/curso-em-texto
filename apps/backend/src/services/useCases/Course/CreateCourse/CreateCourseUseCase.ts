import { CourseModelData } from '@/data/models/Course';
import {
  CourseRepository,
  CreateCourseData,
} from '@/data/repositories/interfaces/CourseRepository';

import { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';
import { Validator } from '@/services/contracts/Validator';

export type CreateCourseInputType = Omit<CreateCourseData, 'slug'>;

export class CreateCourseUseCase
  implements UseCase<CreateCourseInputType, CourseModelData>
{
  constructor(
    private readonly validator: Validator,
    private readonly courseRepository: CourseRepository
  ) {}

  async execute(
    data: CreateCourseInputType
  ): Promise<UseCaseResponse<CourseModelData>> {
    this.requiredFields(data);
    const {
      title,
      description,
      shortDescription,
      authorId,
      tags,
      difficulty = 'beginner',
      estimatedHours = 0,
      status = 'draft',
      isPublic = false,
    } = data;

    const authorExist = await this.courseRepository.findAuthorById(authorId);
    if (!authorExist) throw new Error('Author not found.');

    if (!this.validator.isValidTitle(title)) {
      throw new Error('It must contain a title between 5 and 255 characters.');
    }

    if (!this.validator.isValidDescription(description)) {
      throw new Error(
        'It must contain a description of at least 50 characters.'
      );
    }

    if (shortDescription) {
      if (!this.validator.isValidShortDescription(shortDescription)) {
        throw new Error(
          'ShortDescription is optional but limited to 500 characters if provided.'
        );
      }
    }

    if (tags && tags.length > 10) {
      throw new Error('It must contain no more than 10 tags.');
    }

    const slug = this.generateSlug(title);
    const slugExists = await this.courseRepository.findBySlug(slug);
    if (slugExists) {
      throw new Error('A course with this slug already exists.');
    }

    const course = await this.courseRepository.create({
      title,
      description,
      shortDescription,
      authorId,
      tags,
      difficulty,
      estimatedHours,
      status,
      isPublic,
      slug,
    });

    return { data: course };
  }

  private requiredFields(data: CreateCourseInputType) {
    const requiredFields = {
      title: 'Title is required.',
      description: 'Description is required.',
      authorId: 'Author ID is required.',
    } satisfies Partial<Record<keyof CreateCourseData, string>>;

    for (const [field, message] of Object.entries(requiredFields)) {
      const value = data[field as keyof CreateCourseInputType];

      if (value === undefined || value === null || value === '') {
        throw new Error(message);
      }
    }
  }

  private generateSlug(title: string): string {
    return title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
