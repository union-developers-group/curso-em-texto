import { ValidatorAdapter } from '@/app/adapters/validators';
import { CourseRepositoryImp } from '@/data/repositories/imp/Course';
import type { Controller } from '@/presentation/contracts/Controller';
import { CreateCourseController } from '@/presentation/controllers/Course/CreateCourse/CreateCourseController';
import { CreateCourseUseCase } from '@/services/useCases/Course/CreateCourse/CreateCourseUseCase';

export const makeCreateCourseController = (): Controller => {
  const validatorAdapter = new ValidatorAdapter();
  const courseRepository = new CourseRepositoryImp();
  const createCourseUseCase = new CreateCourseUseCase(
    validatorAdapter,
    courseRepository
  );

  return new CreateCourseController(createCourseUseCase);
};
