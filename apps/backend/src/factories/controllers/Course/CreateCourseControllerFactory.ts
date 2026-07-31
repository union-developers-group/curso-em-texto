import type { Controller } from '@/presentation/contracts/Controller';
import { CreateCourseController } from '@/presentation/controllers/Course/CreateCourse/CreateCourseController';

import { makeCreateCourseUseCase } from '@/factories/useCases/Course/CreateCourseUseCaseFactory';

export const makeCreateCourseController = (): Controller => {
  const createCourseUseCase = makeCreateCourseUseCase();

  return new CreateCourseController(createCourseUseCase);
};
