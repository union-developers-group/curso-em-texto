import { ValidatorAdapter } from '@/app/adapters/validators';
import type { CourseModelData } from '@/data/models/Course';
import { CourseRepositoryImp } from '@/data/repositories/imp/Course';

import type { UseCase } from '@/services/contracts/UseCase';
import {
  type UpdateCourseDetailsInputType,
  UpdateCourseDetailsUseCase,
} from '@/services/useCases/Course/UpdateCourseDetails/UpdateCourseDetailsUseCase';

export const makeUpdateCourseDetailsUseCase = (): UseCase<
  UpdateCourseDetailsInputType,
  CourseModelData
> => {
  const validatorAdapter = new ValidatorAdapter();
  const courseRepository = new CourseRepositoryImp();

  const useCase = new UpdateCourseDetailsUseCase(
    validatorAdapter,
    courseRepository
  );

  return useCase;
};
