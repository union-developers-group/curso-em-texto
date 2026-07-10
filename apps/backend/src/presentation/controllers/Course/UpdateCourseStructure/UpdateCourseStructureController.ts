import type { UseCase } from '@/services/contracts/UseCase';
import type { Controller } from '@/presentation/contracts/Controller';

import type {
  UpdateCourseStructureInputType,
  CourseStructureResponse,
} from '@/services/useCases/Course/UpdateCourseStructure/UpdateCourseStructureUseCase';

export type UpdateCourseStructureRequestType = Omit<
  UpdateCourseStructureInputType,
  'userId'
>;

interface UpdateCourseStructureRequest
  extends UpdateCourseStructureRequestType {
  userId?: string;
}

type RequiredFields = keyof Pick<
  UpdateCourseStructureRequestType,
  'courseId' | 'modules'
>;

const requiredFields: RequiredFields[] = ['courseId', 'modules'];

export class UpdateCourseStructureController implements Controller {
  constructor(
    private readonly updateCourseStructureUseCase: UseCase<
      UpdateCourseStructureInputType,
      CourseStructureResponse
    >
  ) {}

  async handle(input: unknown) {
    if (!input || typeof input !== 'object') {
      return {
        statusCode: 400,
        body: new Error('Invalid request body'),
      };
    }

    const request = input as UpdateCourseStructureRequest;

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

    const { courseId, userId, modules } = request;

    try {
      const { error, data } = await this.updateCourseStructureUseCase.execute({
        courseId,
        userId,
        modules,
      });

      if (error) {
        return {
          statusCode: 400,
          body: new Error(error),
        };
      }

      return {
        statusCode: 200,
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
