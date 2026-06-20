import { CourseModelData } from '@/data/models/Course';
import { ModuleModelData } from '@/data/models/Module';
import { UserModelData } from '@/data/models/User';

import { CourseRepository } from '@/data/repositories/interfaces/CourseRepository';
import { LessonRepository } from '@/data/repositories/interfaces/LessonRepository';
import { ModuleRepository } from '@/data/repositories/interfaces/ModuleRepository';
import { UserRepository } from '@/data/repositories/interfaces/UserRepository';

import { UseCase, UseCaseResponse } from '@/services/contracts/UseCase';

export type CourseStructureLessonInput = {
  id?: string;
  title: string;
  content: string;
  order: number;
};

export type CourseStructureModuleInput = {
  id?: string;
  title: string;
  order: number;
  lessons: CourseStructureLessonInput[];
};

export type UpdateCourseStructureInputType = {
  courseId: string;
  userId: string;
  modules: CourseStructureModuleInput[];
};

export type CourseStructureResponse = {
  courseId: string;
  modules: {
    id: string;
    title: string;
    order: number;
    lessons: {
      id: string;
      title: string;
      order: number;
    }[];
  }[];
};

export class UpdateCourseStructureUseCase
  implements UseCase<UpdateCourseStructureInputType, CourseStructureResponse>
{
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository,
    private readonly moduleRepository: ModuleRepository,
    private readonly lessonRepository: LessonRepository
  ) {}

  async execute(
    data: UpdateCourseStructureInputType
  ): Promise<UseCaseResponse<CourseStructureResponse>> {
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

    const duplicateModulesError = this.validateDuplicateModules(data.modules);

    if (duplicateModulesError) {
      return {
        data: null,
        error: duplicateModulesError,
      };
    }

    const currentModules = await this.moduleRepository.findByCourseId(
      data.courseId
    );

    const modulesToDelete = this.getModulesToDelete(
      currentModules,
      data.modules
    );

    const publishedLessonsError =
      await this.validatePublishedLessonsInRemovedModules(modulesToDelete);

    if (publishedLessonsError) {
      return {
        data: null,
        error: publishedLessonsError,
      };
    }

    for (const module of modulesToDelete) {
      await this.moduleRepository.delete(module.id);
    }

    const modulesToCreate = this.getModulesToCreate(data.modules);

    const modulesToUpdate = this.getModulesToUpdate(data.modules);

    for (const module of modulesToCreate) {
      await this.moduleRepository.create({
        courseId: data.courseId,
        title: module.title,
        order: module.order,
      });
    }

    for (const module of modulesToUpdate) {
      if (!module.id) {
        continue;
      }

      await this.moduleRepository.update(module.id, {
        title: module.title,
        order: module.order,
      });
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

  private validateDuplicateModules(
    modules: CourseStructureModuleInput[]
  ): string | null {
    const normalizedTitles = modules.map((module) =>
      module.title.trim().toLocaleLowerCase()
    );

    const hasDuplicates =
      new Set(normalizedTitles).size !== normalizedTitles.length;

    if (hasDuplicates) {
      return 'Duplicate modules are not allowed.';
    }

    return null;
  }

  private getModulesToCreate(
    modules: CourseStructureModuleInput[]
  ): CourseStructureModuleInput[] {
    return modules.filter((module) => !module.id);
  }

  private getModulesToUpdate(
    modules: CourseStructureModuleInput[]
  ): CourseStructureModuleInput[] {
    return modules.filter((module) => module.id);
  }

  private getModulesToDelete(
    currentModules: ModuleModelData[],
    modules: CourseStructureModuleInput[]
  ): ModuleModelData[] {
    const payloadIds = modules
      .filter((module) => module.id)
      .map((module) => module.id);

    return currentModules.filter((module) => !payloadIds.includes(module.id));
  }

  private async validatePublishedLessonsInRemovedModules(
    modulesToDelete: ModuleModelData[]
  ): Promise<string | null> {
    for (const module of modulesToDelete) {
      const lessons = await this.lessonRepository.findByModuleId(module.id);

      const hasPublishedLesson = lessons.some((lesson) => lesson.isPublished);

      if (hasPublishedLesson) {
        return 'Cannot remove module with published lessons.';
      }
    }

    return null;
  }
}
