import {
  userGoogleProviderMock,
  userGithubProviderMock,
  UserRepositoryStub,
} from '@/__tests__/stubs/repositories/UserRepositoryStub';

import {
  courseDataMock,
  CourseRepositoryStub,
} from '@/__tests__/stubs/repositories/CourseRepositoryStub';

import { SubmitCourseForReviewUseCase } from './SubmitCourseForReviewUseCase';

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
  id: '1234',
  authorId: authorUserMock.id,
};

const makeSut = () => {
  const courseRepositoryStub = new CourseRepositoryStub();
  const userRepositoryStub = new UserRepositoryStub();

  const sut = new SubmitCourseForReviewUseCase(
    courseRepositoryStub,
    userRepositoryStub
  );

  return {
    courseRepositoryStub,
    userRepositoryStub,
    sut,
  };
};

describe('SubmitCourseForReviewUseCase', () => {
  it('should return error if course does not exist', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      courseId: crypto.randomUUID(),
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
      userId: crypto.randomUUID(),
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'User not found.',
    });
  });

  it('should return error if user is not the course author or admin', async () => {
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

  it('should submit course for review if user is admin', async () => {
    const { sut, userRepositoryStub } = makeSut();

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(adminUserMock);

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: adminUserMock.id,
    });

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  });

  it('should submit course for review if user is the course author', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
    });

    expect(response.error).toBeNull();
    expect(response.data).not.toBeNull();
  });

  it('should update course status to revision', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const updateSpy = vitest.spyOn(courseRepositoryStub, 'update');

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
    });

    expect(updateSpy).toHaveBeenCalledWith(courseMock.id, {
      status: 'revision',
    });
  });

  it('should return submitted course response', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseMock);

    const updatedCourse = {
      ...courseMock,
      status: 'revision',
    };

    vitest
      .spyOn(courseRepositoryStub, 'update')
      .mockResolvedValueOnce(updatedCourse);

    const response = await sut.execute({
      courseId: courseMock.id,
      userId: authorUserMock.id,
    });

    expect(response).toStrictEqual({
      data: updatedCourse,
      error: null,
    });
  });
});
