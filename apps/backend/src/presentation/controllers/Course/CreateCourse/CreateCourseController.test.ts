import type { CourseModelData } from '@/data/models/Course';
import {
  courseAuthorMock,
  courseDataMock,
} from '@/__tests__/stubs/repositories/CourseRepositoryStub';
import { UseCaseStub } from '@/__tests__/stubs/UseCaseStub';
import type { CreateCourseInputType } from '@/services/useCases/Course/CreateCourse/CreateCourseUseCase';

import {
  CreateCourseController,
  type CreateCourseRequestType,
} from './CreateCourseController';

const makeSut = () => {
  const createCourseUseCaseStub = new UseCaseStub<
    CreateCourseInputType,
    CourseModelData
  >();

  const sut = new CreateCourseController(createCourseUseCaseStub);

  return {
    sut,
    createCourseUseCaseStub,
  };
};

const setupCreateCourseControllerTest = () => {
  const { sut, createCourseUseCaseStub } = makeSut();

  const requestMock: CreateCourseRequestType & { userId: string } = {
    title: courseDataMock.title,
    description: courseDataMock.description,
    shortDescription: courseDataMock.shortDescription ?? undefined,
    tags: courseDataMock.tags ?? undefined,
    difficulty: 'beginner',
    estimatedHours: courseDataMock.estimatedHours,
    status: 'draft',
    isPublic: courseDataMock.isPublic,
    userId: courseAuthorMock.id,
  };

  return {
    sut,
    requestMock,
    createCourseUseCaseStub,
  };
};

describe('CreateCourseController', () => {
  it.each([undefined, null, 'invalid-input'])(
    'should return status code 401 if input is not a valid object',
    async (input) => {
      const { sut } = setupCreateCourseControllerTest();

      const response = await sut.handle(input);

      expect(response.statusCode).toBe(401);
      expect(response.body).toStrictEqual(new Error('Unauthorized'));
    }
  );

  it('should return status code 401 if user is not authenticated', async () => {
    const { sut, requestMock } = setupCreateCourseControllerTest();

    const response = await sut.handle({
      ...requestMock,
      userId: undefined,
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual(new Error('Unauthorized'));
  });

  it('should return status code 400 if title is not provided', async () => {
    const { sut, requestMock } = setupCreateCourseControllerTest();

    const response = await sut.handle({
      ...requestMock,
      title: null,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Missing param: title'));
  });

  it('should return status code 400 if description is not provided', async () => {
    const { sut, requestMock } = setupCreateCourseControllerTest();

    const response = await sut.handle({
      ...requestMock,
      description: null,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(
      new Error('Missing param: description')
    );
  });

  it('should call use case with correct values', async () => {
    const { sut, requestMock, createCourseUseCaseStub } =
      setupCreateCourseControllerTest();

    const useCaseSpy = vitest.spyOn(createCourseUseCaseStub, 'execute');

    await sut.handle(requestMock);

    expect(useCaseSpy).toHaveBeenCalledWith({
      title: requestMock.title,
      description: requestMock.description,
      shortDescription: requestMock.shortDescription,
      tags: requestMock.tags,
      difficulty: requestMock.difficulty,
      estimatedHours: requestMock.estimatedHours,
      status: requestMock.status,
      isPublic: requestMock.isPublic,
      authorId: requestMock.userId,
    });
  });

  it('should return status code 400 if use case return error', async () => {
    const { sut, requestMock, createCourseUseCaseStub } =
      setupCreateCourseControllerTest();

    const useCaseError = new Error('Validation error');

    vitest.spyOn(createCourseUseCaseStub, 'execute').mockResolvedValueOnce({
      data: null,
      error: useCaseError.message,
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(useCaseError);
  });

  it('should return status code 500 if use case throw', async () => {
    const { sut, requestMock, createCourseUseCaseStub } =
      setupCreateCourseControllerTest();

    const error = new Error('Server error');

    vitest.spyOn(createCourseUseCaseStub, 'execute').mockImplementation(() => {
      throw error;
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual(error);
  });

  it('should return status code 201 if use case execute success', async () => {
    const { sut, requestMock, createCourseUseCaseStub } =
      setupCreateCourseControllerTest();

    vitest.spyOn(createCourseUseCaseStub, 'execute').mockResolvedValueOnce({
      data: courseDataMock,
      error: null,
    });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(courseDataMock);
  });
});
