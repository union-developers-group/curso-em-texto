import { CourseModelData } from '@/data/models/Course';
import { UserModelData } from '@/data/models/User';
import { CourseRepository } from '@/data/repositories/interfaces/CourseRepository';
import { UserRepository } from '@/data/repositories/interfaces/UserRepository';
import { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';

export type UpdateCourseStructureInputType = {
  courseId: string;
  userId: string;
};

export class UpdateCourseStructureUseCase
  implements UseCase<UpdateCourseStructureInputType, unknown>
{
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository
  ) {}

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

    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      return {
        data: null,
        error: 'User not found.',
      };
    }

    const permissionError = this.checkPermissionsForUpdate(course, user);

    if (permissionError) {
      return {
        data: null,
        error: permissionError,
      };
    }

    const courseStatusError = this.checkCourseStatusForUpdate(course);

    if (courseStatusError) {
      return {
        data: null,
        error: courseStatusError,
      };
    }

    return {
      data: null,
      error: null,
    };
  }

  private checkPermissionsForUpdate(
    course: CourseModelData,
    user: UserModelData
  ): string | null {
    const isAuthor = course.authorId === user.id;
    const isAdmin = user.role === 'admin';

    if (!isAuthor && !isAdmin) {
      return 'You do not have permission.';
    }

    return null;
  }

  private checkCourseStatusForUpdate(course: CourseModelData): string | null {
    if (course.status === 'archived') {
      return 'It is not possible to edit an archived course.';
    }

    return null;
  }
}
