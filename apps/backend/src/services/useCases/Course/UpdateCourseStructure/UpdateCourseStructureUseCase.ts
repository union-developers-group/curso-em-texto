import { CourseRepository } from '@/data/repositories/interfaces/CourseRepository';
import { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';

export type UpdateCourseStructureInputType = {
  courseId: string;
  userId: string;
};

export class UpdateCourseStructureUseCase
  implements UseCase<UpdateCourseStructureInputType, unknown>
{
  constructor(private readonly courseRepository: CourseRepository) {}

  async execute(
    data: UpdateCourseStructureInputType
  ): Promise<UseCaseResponse<unknown>> {
    const course = await this.courseRepository.findById(data.courseId);

    if (!course) {
      return {
        data: null,
        error: 'Course not found.',
      };
    }

    return {
      data: null,
      error: null,
    };
  }
}
