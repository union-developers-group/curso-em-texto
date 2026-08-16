import { UserModelData } from '@/data/models/User';
import { CourseModelData } from '@/data/models/Course';

import { CourseRepository } from '@/data/repositories/interfaces/CourseRepository';
import { UserRepository } from '@/data/repositories/interfaces/UserRepository';

import { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';

export type SubmitCourseForReviewInputType = {
  courseId: string;
  userId: string;
};

export class SubmitCourseForReviewUseCase
  implements UseCase<SubmitCourseForReviewInputType, CourseModelData>
{
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    data: SubmitCourseForReviewInputType
  ): Promise<UseCaseResponse<CourseModelData>> {
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

    const permissionError = this.checkPermissionsForSubmit(course, user);

    if (permissionError) {
      return {
        data: null,
        error: permissionError,
      };
    }

    const updatedCourse = await this.courseRepository.update(course.id, {
      status: 'revision',
    });

    if (!updatedCourse) {
      return {
        data: null,
        error: 'Failed to update course status.',
      };
    }

    return {
      data: updatedCourse,
      error: null,
    };
  }

  private checkPermissionsForSubmit(
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
}
