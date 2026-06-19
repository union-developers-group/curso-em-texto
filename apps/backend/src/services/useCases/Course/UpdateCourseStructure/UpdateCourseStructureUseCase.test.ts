import {
  userGoogleProviderMock,
  userGithubProviderMock,
  UserRepositoryStub,
} from '@/__tests__/stubs/repositories/UserRepositoryStub';

import {
  courseDataMock,
  CourseRepositoryStub,
} from '@/__tests__/stubs/repositories/CourseRepositoryStub';
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

const makeSut = () => {
  const courseRepositoryStub = new CourseRepositoryStub();
  const userRepositoryStub = new UserRepositoryStub();

  const sut = new UpdateCourseStructureUseCase(
    courseRepositoryStub,
    userRepositoryStub
  );

  return {
    courseRepositoryStub,
    userRepositoryStub,
    sut,
  };
};

describe('UpdateCourseStructureUseCase', () => {
  it('should return error if course does not exist', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      courseId: 'invalid-id',
      userId: authorUserMock.id,
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
    });

    expect(response).toStrictEqual({
      data: null,
      error: null,
    });
  });
});
