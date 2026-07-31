import { ValidatorAdapter } from '@/app/adapters/validators';

import type { CourseModelData } from '@/data/models/Course';
import { CourseRepositoryImp } from '@/data/repositories/imp/Course';

import type { UseCase } from '@/services/contracts/UseCase';
import {
  CreateCourseUseCase,
  type CreateCourseInputType,
} from '@/services/useCases/Course/CreateCourse/CreateCourseUseCase';

export const makeCreateCourseUseCase = (): UseCase<
  CreateCourseInputType,
  CourseModelData
> => {
  const validatorAdapter = new ValidatorAdapter();
  const courseRepository = new CourseRepositoryImp();

  const useCase = new CreateCourseUseCase(validatorAdapter, courseRepository);

  return useCase;
};
