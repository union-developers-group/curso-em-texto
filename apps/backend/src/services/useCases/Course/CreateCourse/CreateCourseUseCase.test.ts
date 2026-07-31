import {
  courseAuthorMock,
  courseDataMock as createdCourseMock,
  CourseRepositoryStub,
} from '@/__tests__/stubs/repositories/CourseRepositoryStub';
import { ValidatorStub } from '@/__tests__/stubs/ValidatorStub';

import {
  CreateCourseInputType,
  CreateCourseUseCase,
} from './CreateCourseUseCase';

const courseDataMock: CreateCourseInputType = {
  title: 'Curso Completo de Node.js',
  description:
    'Descricao completa do curso com conteudo suficiente para validar a regra de tamanho minimo.',
  authorId: courseAuthorMock.id,
};

const makeSut = () => {
  const validatorStub = new ValidatorStub();
  const courseRepositoryStub = new CourseRepositoryStub();

  const sut = new CreateCourseUseCase(validatorStub, courseRepositoryStub);

  return {
    validatorStub,
    courseRepositoryStub,
    sut,
  };
};

describe('CreateCourseUseCase', () => {
  it('should validate the author existence', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnFindAuthorById = vitest.spyOn(
      courseRepositoryStub,
      'findAuthorById'
    );

    await sut.execute(courseDataMock);

    expect(spyOnFindAuthorById).toHaveBeenCalledWith(courseDataMock.authorId);
  });

  it('should return error if author does not exist', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findAuthorById')
      .mockResolvedValueOnce(null);

    const response = await sut.execute(courseDataMock);

    expect(response).toStrictEqual({
      data: null,
      error: 'Author not found.',
    });
  });

  it('should return error if authorId is not provided', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...courseDataMock,
      authorId: '',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Author ID is required.',
    });
  });

  it('should return error if title is not provided', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...courseDataMock,
      title: '',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Title is required.',
    });
  });

  it('should return error if description is not provided', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...courseDataMock,
      description: '',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Description is required.',
    });
  });

  it('should return error if title does not contain between 5 and 255 characters', async () => {
    const { sut, validatorStub } = makeSut();

    const spyOnIsValidTitle = vitest
      .spyOn(validatorStub, 'isValidTitle')
      .mockReturnValueOnce(false);

    const response = await sut.execute({
      ...courseDataMock,
      title: 'Node',
    });

    expect(spyOnIsValidTitle).toHaveBeenCalledWith('Node');
    expect(response).toStrictEqual({
      data: null,
      error: 'It must contain a title between 5 and 255 characters.',
    });
  });

  it('should return error if description does not contain at least 50 characters', async () => {
    const { sut, validatorStub } = makeSut();

    const spyOnIsValidDescription = vitest
      .spyOn(validatorStub, 'isValidDescription')
      .mockReturnValueOnce(false);

    const response = await sut.execute({
      ...courseDataMock,
      description: 'Descricao curta.',
    });

    expect(spyOnIsValidDescription).toHaveBeenCalledWith('Descricao curta.');
    expect(response).toStrictEqual({
      data: null,
      error: 'It must contain a description of at least 50 characters.',
    });
  });

  it('should return error if more than 10 tags are provided', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...courseDataMock,
      tags: [
        'tag-1',
        'tag-2',
        'tag-3',
        'tag-4',
        'tag-5',
        'tag-6',
        'tag-7',
        'tag-8',
        'tag-9',
        'tag-10',
        'tag-11',
      ],
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'It must contain no more than 10 tags.',
    });
  });

  it('should allow optional tags limited to 10 per course', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnCreate = vitest.spyOn(courseRepositoryStub, 'create');
    const tags = [
      'node',
      'typescript',
      'api',
      'tests',
      'backend',
      'clean-code',
      'solid',
      'database',
      'auth',
      'deploy',
    ];

    await sut.execute({
      ...courseDataMock,
      tags,
    });

    expect(spyOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        tags,
      })
    );
  });

  it('should return error if shortDescription contains more than 500 characters', async () => {
    const { sut, validatorStub } = makeSut();

    const shortDescription = 'a'.repeat(501);
    const spyOnIsValidShortDescription = vitest
      .spyOn(validatorStub, 'isValidShortDescription')
      .mockReturnValueOnce(false);

    const response = await sut.execute({
      ...courseDataMock,
      shortDescription,
    });

    expect(spyOnIsValidShortDescription).toHaveBeenCalledWith(shortDescription);
    expect(response).toStrictEqual({
      data: null,
      error:
        'ShortDescription is optional but limited to 500 characters if provided.',
    });
  });

  it('should allow optional shortDescription when it contains up to 500 characters', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const shortDescription = 'Resumo breve do curso.';
    const spyOnCreate = vitest.spyOn(courseRepositoryStub, 'create');

    await sut.execute({
      ...courseDataMock,
      shortDescription,
    });

    expect(spyOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        shortDescription,
      })
    );
  });

  it('should generate a unique slug based on title removing accents and special characters', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnFindBySlug = vitest.spyOn(courseRepositoryStub, 'findBySlug');
    const spyOnCreate = vitest.spyOn(courseRepositoryStub, 'create');

    await sut.execute({
      ...courseDataMock,
      title: '  Cria\u00e7\u00e3o de APIs: Node.js & TypeScript!!!  ',
    });

    expect(spyOnFindBySlug).toHaveBeenCalledWith(
      'criacao-de-apis-nodejs-typescript'
    );
    expect(spyOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: 'criacao-de-apis-nodejs-typescript',
      })
    );
  });

  it('should return error if a course with the same slug already exists', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'findBySlug')
      .mockResolvedValueOnce(createdCourseMock);

    const response = await sut.execute(courseDataMock);

    expect(response).toStrictEqual({
      data: null,
      error: 'A course with this slug already exists.',
    });
  });

  it("should create course with status 'draft' by default", async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnCreate = vitest.spyOn(courseRepositoryStub, 'create');

    await sut.execute(courseDataMock);

    expect(spyOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'draft',
      })
    );
  });

  it('should create course as private by default', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnCreate = vitest.spyOn(courseRepositoryStub, 'create');

    await sut.execute(courseDataMock);

    expect(spyOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        isPublic: false,
      })
    );
  });

  it("should apply difficulty 'beginner' by default", async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnCreate = vitest.spyOn(courseRepositoryStub, 'create');

    await sut.execute(courseDataMock);

    expect(spyOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        difficulty: 'beginner',
      })
    );
  });

  it('should apply estimatedHours 0 by default', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnCreate = vitest.spyOn(courseRepositoryStub, 'create');

    await sut.execute(courseDataMock);

    expect(spyOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        estimatedHours: 0,
      })
    );
  });

  it('should create a course with correct default values', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnCreate = vitest.spyOn(courseRepositoryStub, 'create');

    await sut.execute(courseDataMock);

    expect(spyOnCreate).toHaveBeenCalledWith({
      ...courseDataMock,
      slug: 'curso-completo-de-nodejs',
      tags: undefined,
      shortDescription: undefined,
      difficulty: 'beginner',
      estimatedHours: 0,
      status: 'draft',
      isPublic: false,
    });
  });

  it('should return created course data', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    vitest
      .spyOn(courseRepositoryStub, 'create')
      .mockResolvedValueOnce(createdCourseMock);

    const response = await sut.execute(courseDataMock);

    expect(response).toStrictEqual({
      data: createdCourseMock,
      error: null,
    });
  });
});
