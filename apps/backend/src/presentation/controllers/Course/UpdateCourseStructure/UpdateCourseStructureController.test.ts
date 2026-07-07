import { UseCaseStub } from '@/__tests__/stubs/UseCaseStub';
import {
  CourseStructureResponse,
  UpdateCourseStructureInputType,
} from '@/services/useCases/Course/UpdateCourseStructure/UpdateCourseStructureUseCase';
import {
  UpdateCourseStructureController,
  UpdateCourseStructureRequestType,
} from './UpdateCourseStructureController';

import { lessonDataMock } from '@/__tests__/stubs/repositories/LessonRepositoryStub';
import { moduleDataMock } from '@/__tests__/stubs/repositories/ModuleRepositoryStub';
import { courseDataMock } from '@/__tests__/stubs/repositories/CourseRepositoryStub';
import { userGithubProviderMock } from '@/__tests__/stubs/repositories/UserRepositoryStub';

const authorUserMock = {
  ...userGithubProviderMock,
};

const courseMock = {
  ...courseDataMock,
  authorId: authorUserMock.id,
};

const courseStructureResponseMock: CourseStructureResponse = {
  courseId: courseMock.id,
  modules: [
    {
      id: moduleDataMock.id,
      title: moduleDataMock.title,
      order: moduleDataMock.order,
      lessons: [
        {
          id: lessonDataMock.id,
          title: lessonDataMock.title,
          content: lessonDataMock.content,
          order: lessonDataMock.order,
        },
      ],
    },
  ],
};

const makeSut = () => {
  const updateCourseStructureUseCaseStub = new UseCaseStub<
    UpdateCourseStructureInputType,
    CourseStructureResponse
  >();

  const sut = new UpdateCourseStructureController(
    updateCourseStructureUseCaseStub
  );

  return {
    sut,
    updateCourseStructureUseCaseStub,
  };
};

const setupUpdateCourseStructureControllerTest = () => {
  const { sut, updateCourseStructureUseCaseStub } = makeSut();

  const requestMock: UpdateCourseStructureRequestType & {
    userId: string;
  } = {
    courseId: courseMock.id,
    userId: authorUserMock.id,
    modules: [
      {
        id: moduleDataMock.id,
        title: moduleDataMock.title,
        order: moduleDataMock.order,
        lessons: [
          {
            id: lessonDataMock.id,
            title: lessonDataMock.title,
            content: lessonDataMock.content,
            order: lessonDataMock.order,
          },
        ],
      },
    ],
  };

  return {
    sut,
    requestMock,
    updateCourseStructureUseCaseStub,
  };
};

describe('UpdateCourseStructureController', () => {
  it.each([undefined, null, 'invalid-input'])(
    'should return status code 401 if input is not a valid object',
    async (input) => {
      const { sut } = setupUpdateCourseStructureControllerTest();

      const response = await sut.handle(input);

      expect(response.statusCode).toBe(401);
      expect(response.body).toStrictEqual(new Error('Unauthorized'));
    }
  );

  it('should return status code 401 if user is not authenticated', async () => {
    const { sut, requestMock } = setupUpdateCourseStructureControllerTest();

    const response = await sut.handle({
      ...requestMock,
      userId: undefined,
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toStrictEqual(new Error('Unauthorized'));
  });

  it('should return status code 400 if courseId is not provided', async () => {
    const { sut, requestMock } = setupUpdateCourseStructureControllerTest();

    const response = await sut.handle({
      ...requestMock,
      courseId: null,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Missing param: courseId'));
  });

  it('should return status code 400 if modules is not provided', async () => {
    const { sut, requestMock } = setupUpdateCourseStructureControllerTest();

    const response = await sut.handle({
      ...requestMock,
      modules: null,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(new Error('Missing param: modules'));
  });

  it('should call use case with correct values', async () => {
    const { sut, requestMock, updateCourseStructureUseCaseStub } =
      setupUpdateCourseStructureControllerTest();

    const useCaseSpy = vitest.spyOn(
      updateCourseStructureUseCaseStub,
      'execute'
    );

    await sut.handle(requestMock);

    expect(useCaseSpy).toHaveBeenCalledWith({
      userId: requestMock.userId,
      courseId: requestMock.courseId,
      modules: requestMock.modules,
    });
  });

  it('should return status code 400 if use case return error', async () => {
    const { sut, requestMock, updateCourseStructureUseCaseStub } =
      setupUpdateCourseStructureControllerTest();

    const useCaseError = new Error('Validation error');

    vitest
      .spyOn(updateCourseStructureUseCaseStub, 'execute')
      .mockResolvedValueOnce({
        data: null,
        error: useCaseError.message,
      });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(useCaseError);
  });

  it('should return status code 500 if use case throw', async () => {
    const { sut, requestMock, updateCourseStructureUseCaseStub } =
      setupUpdateCourseStructureControllerTest();

    const error = new Error('Server error');

    vitest
      .spyOn(updateCourseStructureUseCaseStub, 'execute')
      .mockImplementation(() => {
        throw error;
      });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual(error);
  });

  it('should return status code 200 if use case execute success', async () => {
    const { sut, requestMock, updateCourseStructureUseCaseStub } =
      setupUpdateCourseStructureControllerTest();

    vitest
      .spyOn(updateCourseStructureUseCaseStub, 'execute')
      .mockResolvedValueOnce({
        data: courseStructureResponseMock,
        error: null,
      });

    const response = await sut.handle(requestMock);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(courseStructureResponseMock);
  });
});
