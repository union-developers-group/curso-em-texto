import { CourseRepositoryImp } from '@/data/repositories/imp/Course';
import { UserRepositoryImp } from '@/data/repositories/imp/User';
import { ModuleRepositoryImp } from '@/data/repositories/imp/Module';
import { LessonRepositoryImp } from '@/data/repositories/imp/Lesson';

import { UpdateCourseStructureController } from '@/presentation/controllers/Course/UpdateCourseStructure/UpdateCourseStructureController';
import { UpdateCourseStructureUseCase } from '@/services/useCases/Course/UpdateCourseStructure/UpdateCourseStructureUseCase';
import { Controller } from '@/presentation/contracts/Controller';

export const makeUpdateCourseStructureController = (): Controller => {
  const courseRepository = new CourseRepositoryImp();
  const userRepository = new UserRepositoryImp();
  const moduleRepository = new ModuleRepositoryImp();
  const lessonRepository = new LessonRepositoryImp();

  const updateCourseStructureUseCase = new UpdateCourseStructureUseCase(
    courseRepository,
    userRepository,
    moduleRepository,
    lessonRepository
  );

  return new UpdateCourseStructureController(updateCourseStructureUseCase);
};
