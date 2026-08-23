import {
  courseDataMock,
  CourseRepositoryStub,
} from '@/__tests__/stubs/repositories/CourseRepositoryStub';
import { CourseReviewRepositoryStub } from '@/__tests__/stubs/repositories/CourseReviewRepositoryStub';
import {
  userGithubProviderMock,
  UserRepositoryStub,
} from '@/__tests__/stubs/repositories/UserRepositoryStub';
import { ReviewCourseUseCase } from './ReviewCourseUseCase';

const userMock = {
  ...userGithubProviderMock,
};

const adminUserMock = {
  ...userGithubProviderMock,
  role: 'admin',
  id: crypto.randomUUID(),
};

const courseWithRevisionStatusMock = {
  ...courseDataMock,
  id: crypto.randomUUID(),
  authorId: adminUserMock.id,
  status: 'revision',
};

const courseWithPublishedStatusMock = {
  ...courseDataMock,
  id: crypto.randomUUID(),
  authorId: adminUserMock.id,
  status: 'published',
};

const makeSut = () => {
  const courseRepositoryStub = new CourseRepositoryStub();
  const userRepositoryStub = new UserRepositoryStub();
  const courseReviewRepositoryStub = new CourseReviewRepositoryStub();

  const sut = new ReviewCourseUseCase(
    courseRepositoryStub,
    userRepositoryStub,
    courseReviewRepositoryStub
  );

  return {
    courseRepositoryStub,
    userRepositoryStub,
    courseReviewRepositoryStub,
    sut,
  };
};

describe('ReviewCourseUseCase', () => {
  it('should return error if course does not exist', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      courseId: crypto.randomUUID(),
      userId: userMock.id,
      status: 'approved',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Course not found.',
    });
  });

  it('should return error if user does not exist', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseWithRevisionStatusMock);

    const response = await sut.execute({
      courseId: courseWithRevisionStatusMock.id,
      userId: crypto.randomUUID(),
      status: 'approved',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'User not found.',
    });
  });

  it('should return error if course status is not revision', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseWithPublishedStatusMock);

    const response = await sut.execute({
      courseId: courseWithPublishedStatusMock.id,
      userId: courseWithPublishedStatusMock.authorId,
      status: 'approved',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Course is not under review.',
    });
  });

  it('should return error if user is not admin', async () => {
    const { sut, courseRepositoryStub, userRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseWithRevisionStatusMock);

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(userMock);

    const response = await sut.execute({
      courseId: courseWithRevisionStatusMock.id,
      userId: userMock.id,
      status: 'approved',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'User without permission.',
    });
  });

  it('should return error if review is rejected and not exists feedback', async () => {
    const { sut, courseRepositoryStub, userRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseWithRevisionStatusMock);

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(adminUserMock);

    const response = await sut.execute({
      courseId: courseWithRevisionStatusMock.id,
      userId: courseWithRevisionStatusMock.authorId,
      status: 'rejected',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Reviews with a "rejected" status must include feedback.',
    });
  });

  it('should create and approved review an publish the course', async () => {
    const {
      sut,
      courseRepositoryStub,
      userRepositoryStub,
      courseReviewRepositoryStub,
    } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findById')
      .mockResolvedValueOnce(courseWithRevisionStatusMock);

    vitest
      .spyOn(userRepositoryStub, 'findById')
      .mockResolvedValueOnce(adminUserMock);

    const createSpy = vitest.spyOn(courseReviewRepositoryStub, 'create');
    const updateSpy = vitest.spyOn(courseRepositoryStub, 'update');

    await sut.execute({
      courseId: courseWithRevisionStatusMock.id,
      userId: courseWithRevisionStatusMock.authorId,
      status: 'approved',
    });

    expect(createSpy).toHaveBeenCalledWith({
      courseId: courseWithRevisionStatusMock.id,
      adminId: adminUserMock.id,
      status: 'approved',
    });
    expect(updateSpy).toHaveBeenCalledWith(courseWithRevisionStatusMock.id, {
      status: 'published',
    });
  });
});
