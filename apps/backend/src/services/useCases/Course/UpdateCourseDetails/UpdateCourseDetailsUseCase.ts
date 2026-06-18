import type { CourseModelData } from '@/data/models/Course';
import {
  CourseRepository,
  UpdateCourseDetailsData,
} from '@/data/repositories/interfaces/CourseRepository';
import type { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';
import type { Validator } from '@/services/contracts/Validator';

export type UpdateCourseDetailsInputType = UpdateCourseDetailsData & {
  courseId: string;
  requesterId: string;
  status?: never;
  isPublic?: never;
  authorId?: never;
};

export class UpdateCourseDetailsUseCase
  implements UseCase<UpdateCourseDetailsInputType, CourseModelData>
{
  constructor(
    private readonly validator: Validator,
    private readonly courseRepository: CourseRepository
  ) {}

  async execute(
    data: UpdateCourseDetailsInputType
  ): Promise<UseCaseResponse<CourseModelData>> {
    const validationError = this.requiredFields(data);
    if (validationError) {
      return { data: null, error: validationError };
    }

    let course = await this.courseRepository.findByIdAndAuthorId(
      data.courseId,
      data.requesterId
    );

    if (!course) {
      const requester = await this.courseRepository.findAuthorById(
        data.requesterId
      );

      if (requester?.role === 'admin') {
        course = await this.courseRepository.findById(data.courseId);
      }
    }

    if (!course) {
      return {
        data: null,
        error: 'Course not found.',
      };
    }

    if (data.title !== undefined && !this.validator.isValidTitle(data.title)) {
      return {
        data: null,
        error: 'It must contain a title between 5 and 255 characters.',
      };
    }

    if (
      data.description !== undefined &&
      !this.validator.isValidDescription(data.description)
    ) {
      return {
        data: null,
        error: 'It must contain a description of at least 50 characters.',
      };
    }

    if (
      data.shortDescription !== undefined &&
      data.shortDescription !== null &&
      !this.validator.isValidShortDescription(data.shortDescription)
    ) {
      return {
        data: null,
        error:
          'ShortDescription is optional but limited to 500 characters if provided.',
      };
    }

    if (data.tags && data.tags.length > 10) {
      return {
        data: null,
        error: 'It must contain no more than 10 tags.',
      };
    }

    if (
      data.difficulty !== undefined &&
      !['beginner', 'intermediate', 'advanced'].includes(data.difficulty)
    ) {
      return {
        data: null,
        error: 'Invalid difficulty.',
      };
    }

    const updateData = this.getUpdateData(data);

    const updatedCourse = await this.courseRepository.updateDetails(
      data.courseId,
      updateData
    );

    return { data: updatedCourse, error: null };
  }

  private requiredFields(data: UpdateCourseDetailsInputType): string | null {
    const requiredFields = {
      courseId: 'Course ID is required.',
      requesterId: 'Requester ID is required.',
    } satisfies Partial<Record<keyof UpdateCourseDetailsInputType, string>>;

    for (const [field, message] of Object.entries(requiredFields)) {
      const value = data[field as keyof UpdateCourseDetailsInputType];

      if (value === undefined || value === null || value === '') {
        return message;
      }
    }

    if (Object.keys(this.getUpdateData(data)).length === 0) {
      return 'At least one course detail must be provided.';
    }

    return null;
  }

  private getUpdateData(
    data: UpdateCourseDetailsInputType
  ): UpdateCourseDetailsData {
    const updateFields = [
      'title',
      'description',
      'shortDescription',
      'tags',
      'difficulty',
      'estimatedHours',
    ] satisfies Array<keyof UpdateCourseDetailsData>;

    return Object.fromEntries(
      updateFields
        .filter((field) => data[field] !== undefined)
        .map((field) => [field, data[field]])
    ) as UpdateCourseDetailsData;
  }
}
