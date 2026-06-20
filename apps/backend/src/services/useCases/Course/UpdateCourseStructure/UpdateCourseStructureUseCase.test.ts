import {
  userGoogleProviderMock,
  userGithubProviderMock,
  UserRepositoryStub,
} from '@/__tests__/stubs/repositories/UserRepositoryStub';

import {
  courseDataMock,
  CourseRepositoryStub,
} from '@/__tests__/stubs/repositories/CourseRepositoryStub';

import {
  moduleDataMock,
  ModuleRepositoryStub,
} from '@/__tests__/stubs/repositories/ModuleRepositoryStub';

import {
  lessonDataMock,
  LessonRepositoryStub,
} from '@/__tests__/stubs/repositories/LessonRepositoryStub';

import { UpdateCourseStructureUseCase } from './UpdateCourseStructureUseCase';

const adminUserMock = {
  ...userGoogleProviderMock,
  role: 'admin',
};

const authorUserMock = {
  ...userGithubProviderMock,
};

const otherUserMock = {
  ...userGoogleProviderMock,
};

const courseMock = {
  ...courseDataMock,
  authorId: authorUserMock.id,
};

const archivedCourseMock = {
  ...courseMock,
  status: 'archived',
};

const existingModuleInputMock = {
  id: moduleDataMock.id,
  title: moduleDataMock.title,
  order: moduleDataMock.order,
  lessons: [],
};

const unpublishedLessonMock = {
  ...lessonDataMock,
  isPublished: false,
};

const makeSut = () => {
  const courseRepositoryStub = new CourseRepositoryStub();
  const userRepositoryStub = new UserRepositoryStub();
  const moduleRepositoryStub = new ModuleRepositoryStub();
  const lessonRepositoryStub = new LessonRepositoryStub();

  const sut = new UpdateCourseStructureUseCase(
    courseRepositoryStub,
    userRepositoryStub,
    moduleRepositoryStub,
    lessonRepositoryStub
  );

  return {
    courseRepositoryStub,
    userRepositoryStub,
    moduleRepositoryStub,
    lessonRepositoryStub,
    sut,
  };
};

describe('UpdateCourseStructureUseCase', () => {
  it('should return error if course does not exist', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      courseId: 'invalid-id',
      userId: authorUserMock.id,
      modules: [existingModuleInputMock],
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Course not found.',
    });
  });

  it('should return error if user does not exist', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: 'invalid-id',
      modules: [existingModuleInputMock],
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'User not found.',
    });
  });

  it('should return error if user not the course author or administrador', async () => {
    const { sut, userRepositoryStub } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(otherUserMock);

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: otherUserMock.id,
      modules: [existingModuleInputMock],
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'You do not have permission.',
    });
  });

  it('should return error if course status is archived', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(archivedCourseMock);

    const response = await sut.execute({
      courseId: archivedCourseMock.id,
      userId: authorUserMock.id,
      modules: [existingModuleInputMock],
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'It is not possible to edit an archived course.',
    });
  });

  it('should return success if the user is admin', async () => {
    const { sut, userRepositoryStub } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(adminUserMock);

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: adminUserMock.id,
      modules: [existingModuleInputMock],
    });

    expect(response).toStrictEqual({
      data: null,
      error: null,
    });
  });

  it('should return success if the user is author', async () => {
    const { sut, userRepositoryStub, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(authorUserMock);

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
      modules: [existingModuleInputMock],
    });

    expect(response).toStrictEqual({
      data: null,
      error: null,
    });
  });

  it('should return error if contains modules with same title', async () => {
    const { sut, userRepositoryStub, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(authorUserMock);

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
      modules: [
        {
          title: 'JavaScript',
          order: 1,
          lessons: [],
        },
        {
          title: 'JavaScript ',
          order: 2,
          lessons: [],
        },
      ],
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Duplicate modules are not allowed.',
    });
  });

  it('should return error if trying to remove module with published lessons', async () => {
    const { sut, userRepositoryStub, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(authorUserMock);

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
      modules: [],
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Cannot remove module with published lessons.',
    });
  });

  it('should delete removed modules', async () => {
    const {
      sut,
      userRepositoryStub,
      courseRepositoryStub,
      moduleRepositoryStub,
      lessonRepositoryStub,
    } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(authorUserMock);

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    vitest
      .spyOn(lessonRepositoryStub, 'findByModuleId')
      .mockResolvedValueOnce([unpublishedLessonMock]);

    const deleteSpy = vitest.spyOn(moduleRepositoryStub, 'delete');

    await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
      modules: [],
    });

    expect(deleteSpy).toHaveBeenCalledWith(moduleDataMock.id);
  });

  it('should create new module', async () => {
    const {
      sut,
      userRepositoryStub,
      courseRepositoryStub,
      moduleRepositoryStub,
    } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(authorUserMock);

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    const createSpy = vitest.spyOn(moduleRepositoryStub, 'create');

    await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
      modules: [
        existingModuleInputMock,
        {
          title: 'React',
          order: 1,
          lessons: [],
        },
      ],
    });

    expect(createSpy).toHaveBeenCalledWith({
      courseId: courseMock.id,
      title: 'React',
      order: 1,
    });
  });

  it('should update existing module', async () => {
    const {
      sut,
      userRepositoryStub,
      courseRepositoryStub,
      moduleRepositoryStub,
    } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(authorUserMock);

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    const updateSpy = vitest.spyOn(moduleRepositoryStub, 'update');

    const updatingModule = {
      ...existingModuleInputMock,
      order: 2,
    };

    await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
      modules: [updatingModule],
    });

    expect(updateSpy).toHaveBeenCalledWith(updatingModule.id, {
      title: updatingModule.title,
      order: 2,
    });
  });
});
