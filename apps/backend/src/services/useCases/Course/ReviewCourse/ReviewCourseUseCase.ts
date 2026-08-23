import {
  CourseReviewModelData,
  CourseReviewStatus,
} from '@/data/models/CourseReview';

import { CourseRepository } from '@/data/repositories/interfaces/CourseRepository';
import { UserRepository } from '@/data/repositories/interfaces/UserRepository';
import { CourseReviewRepository } from '@/data/repositories/interfaces/CourseReviewRepository';

import { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';

export type ReviewCourseInput = {
  userId: string;
  courseId: string;
  status: CourseReviewStatus;
  feedback?: string;
};

export class ReviewCourseUseCase implements UseCase<
  ReviewCourseInput,
  CourseReviewModelData
> {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository,
    private readonly courseReviewRepository: CourseReviewRepository
  ) {}

  async execute(
    data: ReviewCourseInput
  ): Promise<UseCaseResponse<CourseReviewModelData>> {
    const validation = await this.validateReviewRequest(data);

    if (validation) {
      return {
        data: validation?.data,
        error: validation?.error,
      };
    }

    const createdReview = await this.courseReviewRepository.create({
      courseId: data.courseId,
      adminId: data.userId,
      status: data.status,
      feedback: data.feedback,
    });

    if (data.status === 'approved') {
      await this.courseRepository.update(data.courseId, {
        status: 'published',
      });
    }

    return {
      data: createdReview,
      error: null,
    };
  }

  private async validateReviewRequest(data: ReviewCourseInput) {
    const course = await this.courseRepository.findById(data.courseId);

    if (!course) {
      return {
        data: null,
        error: 'Course not found.',
      };
    }

    if (course.status !== 'revision') {
      return {
        data: null,
        error: 'Course is not under review.',
      };
    }

    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      return {
        data: null,
        error: 'User not found.',
      };
    }

    if (user.role !== 'admin') {
      return {
        data: null,
        error: 'User without permission.',
      };
    }

    if (
      data.status === 'rejected' &&
      (!data.feedback || data.feedback.trim() === '')
    ) {
      return {
        data: null,
        error: 'Reviews with a "rejected" status must include feedback.',
      };
    }
  }
}
