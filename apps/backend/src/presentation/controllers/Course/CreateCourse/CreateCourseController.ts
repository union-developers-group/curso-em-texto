import type { CourseModelData } from '@/data/models/Course';
import type { UseCase } from '@/services/contracts/UseCase';
import type { CreateCourseInputType } from '@/services/useCases/Course/CreateCourse/CreateCourseUseCase';

import type { Controller } from '@/presentation/contracts/Controller';

export type CreateCourseRequestType = Omit<CreateCourseInputType, 'authorId'>;

interface CreateCourseRequest extends CreateCourseRequestType {
  userId?: string;
}

type RequiredFields = keyof Pick<
  CreateCourseRequestType,
  'title' | 'description'
>;

const requiredFields: RequiredFields[] = ['title', 'description'];

export class CreateCourseController implements Controller {
  constructor(
    private readonly createCourseUseCase: UseCase<
      CreateCourseInputType,
      CourseModelData
    >
  ) {}

  async handle(input: unknown) {
    if (!input || typeof input !== 'object') {
      return {
        statusCode: 401,
        body: new Error('Unauthorized'),
      };
    }

    const request = input as CreateCourseRequest;

    if (!request.userId) {
      return {
        statusCode: 401,
        body: new Error('Unauthorized'),
      };
    }

    for (const field of requiredFields) {
      if (!request[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`),
        };
      }
    }

    const {
      title,
      description,
      shortDescription,
      tags,
      difficulty,
      estimatedHours,
      status,
      isPublic,
      userId,
    } = request;

    const courseData: CreateCourseInputType = {
      title,
      description,
      shortDescription,
      tags,
      difficulty,
      estimatedHours,
      status,
      isPublic,
      authorId: userId,
    };

    try {
      const { error, data } =
        await this.createCourseUseCase.execute(courseData);

      if (error) {
        return {
          statusCode: 400,
          body: new Error(error),
        };
      }

      return {
        statusCode: 201,
        body: data,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return {
        statusCode: 500,
        body: new Error('Server error'),
      };
    }
  }
}
