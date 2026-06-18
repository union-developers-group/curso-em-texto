import type { CourseModelData } from '@/data/models/Course';
import type { UserModelData } from '@/data/models/User';
import type {
  CourseRepository,
  CreateCourseData,
  UpdateCourseDetailsData,
} from '@/data/repositories/interfaces/CourseRepository';
import type { Validator } from '@/services/contracts/Validator';

import {
  UpdateCourseDetailsInputType,
  UpdateCourseDetailsUseCase,
} from './UpdateCourseDetailsUseCase';

const courseMock: CourseModelData = {
  id: 'course-id',
  title: 'Curso Completo de Node.js',
  slug: 'curso-completo-de-nodejs',
  description:
    'Descricao completa do curso com conteudo suficiente para validar a regra de tamanho minimo.',
  shortDescription: 'Curso pratico de Node.js para backend.',
  authorId: 'author-id',
  tags: ['node', 'typescript'],
  difficulty: 'beginner',
  estimatedHours: 20,
  status: 'draft',
  isPublic: false,
  enrollmentCount: 0,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

const authorMock: UserModelData = {
  id: courseMock.authorId,
  email: 'author@example.com',
  name: 'Course Author',
  role: 'teacher',
  isActive: true,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

const adminMock: UserModelData = {
  id: 'admin-id',
  email: 'admin@example.com',
  name: 'Course Admin',
  role: 'admin',
  isActive: true,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

const updateCourseDetailsMock: UpdateCourseDetailsInputType = {
  courseId: courseMock.id,
  requesterId: courseMock.authorId,
  title: 'Curso Completo de TypeScript',
  description:
    'Descricao atualizada do curso com conteudo suficiente para validar a regra de tamanho minimo.',
  tags: ['typescript', 'backend', 'tests'],
  difficulty: 'intermediate',
};

class ValidatorStub implements Validator {
  isEmail(): boolean {
    return true;
  }

  isValidTitle(value: string): boolean {
    return value.length >= 5 && value.length <= 255;
  }

  isValidDescription(value: string): boolean {
    return value.length >= 50;
  }

  isValidShortDescription(value: string): boolean {
    return value.length <= 500;
  }
}

class CourseRepositoryStub implements CourseRepository {
  async create(data: CreateCourseData): Promise<CourseModelData> {
    return {
      ...courseMock,
      ...data,
    };
  }

  async findAuthorById(authorId: string): Promise<UserModelData | null> {
    if (authorId === adminMock.id) {
      return adminMock;
    }

    return authorId === authorMock.id ? authorMock : null;
  }

  async findBySlug(slug: string): Promise<CourseModelData | null> {
    return slug === courseMock.slug ? courseMock : null;
  }

  async findById(courseId: string): Promise<CourseModelData | null> {
    return courseId === courseMock.id ? courseMock : null;
  }

  async findByIdAndAuthorId(
    courseId: string,
    authorId: string
  ): Promise<CourseModelData | null> {
    if (courseId !== courseMock.id || authorId !== courseMock.authorId) {
      return null;
    }

    return courseMock;
  }

  async updateDetails(
    courseId: string,
    data: UpdateCourseDetailsData
  ): Promise<CourseModelData> {
    return {
      ...courseMock,
      ...data,
      id: courseId,
      status: courseMock.status,
      isPublic: courseMock.isPublic,
      authorId: courseMock.authorId,
      updatedAt: new Date('2026-01-02T00:00:00.000Z'),
    };
  }
}

const makeSut = () => {
  const validatorStub = new ValidatorStub();
  const courseRepositoryStub = new CourseRepositoryStub();

  const sut = new UpdateCourseDetailsUseCase(
    validatorStub,
    courseRepositoryStub
  );

  return {
    validatorStub,
    courseRepositoryStub,
    sut,
  };
};

describe('UpdateCourseDetailsUseCase', () => {
  it('should return error if courseId is not provided', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...updateCourseDetailsMock,
      courseId: '',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Course ID is required.',
    });
  });

  it('should return error if requesterId is not provided', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...updateCourseDetailsMock,
      requesterId: '',
    });

    expect(response).toStrictEqual({
      data: null,
      error: 'Requester ID is required.',
    });
  });

  it('should return error if no course detail is provided', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnFindByIdAndAuthorId = vitest.spyOn(
      courseRepositoryStub,
      'findByIdAndAuthorId'
    );

    const response = await sut.execute({
      courseId: courseMock.id,
      requesterId: courseMock.authorId,
    });

    expect(spyOnFindByIdAndAuthorId).not.toHaveBeenCalled();
    expect(response).toStrictEqual({
      data: null,
      error: 'At least one course detail must be provided.',
    });
  });

  it('should validate if course belongs to requester through repository', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnFindByIdAndAuthorId = vitest.spyOn(
      courseRepositoryStub,
      'findByIdAndAuthorId'
    );

    await sut.execute(updateCourseDetailsMock);

    expect(spyOnFindByIdAndAuthorId).toHaveBeenCalledWith(
      courseMock.id,
      courseMock.authorId
    );
  });

  it('should return error if course does not exist or does not belong to requester', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnUpdateDetails = vitest.spyOn(
      courseRepositoryStub,
      'updateDetails'
    );

    const response = await sut.execute({
      ...updateCourseDetailsMock,
      requesterId: 'another-user-id',
    });

    expect(spyOnUpdateDetails).not.toHaveBeenCalled();
    expect(response).toStrictEqual({
      data: null,
      error: 'Course not found.',
    });
  });

  it('should allow admin to update a course from another author', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnFindById = vitest.spyOn(courseRepositoryStub, 'findById');
    const spyOnUpdateDetails = vitest.spyOn(
      courseRepositoryStub,
      'updateDetails'
    );

    const response = await sut.execute({
      ...updateCourseDetailsMock,
      requesterId: adminMock.id,
      title: 'Curso Atualizado Pelo Admin',
    });

    expect(spyOnFindById).toHaveBeenCalledWith(courseMock.id);
    expect(spyOnUpdateDetails).toHaveBeenCalledWith(courseMock.id, {
      title: 'Curso Atualizado Pelo Admin',
      description: updateCourseDetailsMock.description,
      tags: updateCourseDetailsMock.tags,
      difficulty: updateCourseDetailsMock.difficulty,
    });
    expect(response.data).toEqual(
      expect.objectContaining({
        title: 'Curso Atualizado Pelo Admin',
        authorId: courseMock.authorId,
      })
    );
    expect(response.error).toBeNull();
  });

  it('should update basic course information', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnUpdateDetails = vitest.spyOn(
      courseRepositoryStub,
      'updateDetails'
    );

    const response = await sut.execute(updateCourseDetailsMock);

    expect(spyOnUpdateDetails).toHaveBeenCalledWith(courseMock.id, {
      title: updateCourseDetailsMock.title,
      description: updateCourseDetailsMock.description,
      tags: updateCourseDetailsMock.tags,
      difficulty: updateCourseDetailsMock.difficulty,
    });
    expect(response.data).toEqual(
      expect.objectContaining({
        title: updateCourseDetailsMock.title,
        description: updateCourseDetailsMock.description,
        tags: updateCourseDetailsMock.tags,
        difficulty: updateCourseDetailsMock.difficulty,
      })
    );
    expect(response.error).toBeNull();
  });

  it('should update only sent fields and keep missing fields unchanged', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnUpdateDetails = vitest.spyOn(
      courseRepositoryStub,
      'updateDetails'
    );

    const response = await sut.execute({
      courseId: courseMock.id,
      requesterId: courseMock.authorId,
      title: 'Curso Atualizado de Node.js',
    });

    expect(spyOnUpdateDetails).toHaveBeenCalledWith(courseMock.id, {
      title: 'Curso Atualizado de Node.js',
    });
    expect(response.data).toEqual(
      expect.objectContaining({
        title: 'Curso Atualizado de Node.js',
        description: courseMock.description,
        tags: courseMock.tags,
        difficulty: courseMock.difficulty,
      })
    );
  });

  it('should return updated course data', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const updatedCourseMock: CourseModelData = {
      ...courseMock,
      title: 'Curso Retornado Atualizado',
      updatedAt: new Date('2026-01-03T00:00:00.000Z'),
    };

    vitest
      .spyOn(courseRepositoryStub, 'updateDetails')
      .mockResolvedValueOnce(updatedCourseMock);

    const response = await sut.execute({
      courseId: courseMock.id,
      requesterId: courseMock.authorId,
      title: updatedCourseMock.title,
    });

    expect(response).toStrictEqual({
      data: updatedCourseMock,
      error: null,
    });
  });

  it('should return error if title does not contain between 5 and 255 characters', async () => {
    const { sut, validatorStub } = makeSut();

    const spyOnIsValidTitle = vitest.spyOn(validatorStub, 'isValidTitle');

    const response = await sut.execute({
      ...updateCourseDetailsMock,
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

    const spyOnIsValidDescription = vitest.spyOn(
      validatorStub,
      'isValidDescription'
    );

    const response = await sut.execute({
      ...updateCourseDetailsMock,
      description: 'Descricao curta.',
    });

    expect(spyOnIsValidDescription).toHaveBeenCalledWith('Descricao curta.');
    expect(response).toStrictEqual({
      data: null,
      error: 'It must contain a description of at least 50 characters.',
    });
  });

  it('should return error if shortDescription contains more than 500 characters', async () => {
    const { sut, validatorStub } = makeSut();

    const shortDescription = 'a'.repeat(501);
    const spyOnIsValidShortDescription = vitest.spyOn(
      validatorStub,
      'isValidShortDescription'
    );

    const response = await sut.execute({
      ...updateCourseDetailsMock,
      shortDescription,
    });

    expect(spyOnIsValidShortDescription).toHaveBeenCalledWith(shortDescription);
    expect(response).toStrictEqual({
      data: null,
      error:
        'ShortDescription is optional but limited to 500 characters if provided.',
    });
  });

  it('should allow clearing optional shortDescription', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnUpdateDetails = vitest.spyOn(
      courseRepositoryStub,
      'updateDetails'
    );

    await sut.execute({
      courseId: courseMock.id,
      requesterId: courseMock.authorId,
      shortDescription: null,
    });

    expect(spyOnUpdateDetails).toHaveBeenCalledWith(courseMock.id, {
      shortDescription: null,
    });
  });

  it('should return error if more than 10 tags are provided', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...updateCourseDetailsMock,
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

  it('should allow clearing optional tags', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnUpdateDetails = vitest.spyOn(
      courseRepositoryStub,
      'updateDetails'
    );

    await sut.execute({
      courseId: courseMock.id,
      requesterId: courseMock.authorId,
      tags: null,
    });

    expect(spyOnUpdateDetails).toHaveBeenCalledWith(courseMock.id, {
      tags: null,
    });
  });

  it('should allow updating estimated hours', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnUpdateDetails = vitest.spyOn(
      courseRepositoryStub,
      'updateDetails'
    );

    await sut.execute({
      courseId: courseMock.id,
      requesterId: courseMock.authorId,
      estimatedHours: 32,
    });

    expect(spyOnUpdateDetails).toHaveBeenCalledWith(courseMock.id, {
      estimatedHours: 32,
    });
  });

  it('should return error if difficulty is invalid', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...updateCourseDetailsMock,
      difficulty: 'expert',
    } as unknown as UpdateCourseDetailsInputType);

    expect(response).toStrictEqual({
      data: null,
      error: 'Invalid difficulty.',
    });
  });

  it('should not send status, isPublic or authorId to update details', async () => {
    const { sut, courseRepositoryStub } = makeSut();

    const spyOnUpdateDetails = vitest.spyOn(
      courseRepositoryStub,
      'updateDetails'
    );

    const response = await sut.execute({
      ...updateCourseDetailsMock,
      status: 'published',
      isPublic: true,
      authorId: 'another-author-id',
    } as unknown as UpdateCourseDetailsInputType);

    expect(spyOnUpdateDetails).toHaveBeenCalledWith(courseMock.id, {
      title: updateCourseDetailsMock.title,
      description: updateCourseDetailsMock.description,
      tags: updateCourseDetailsMock.tags,
      difficulty: updateCourseDetailsMock.difficulty,
    });
    expect(response.data).toEqual(
      expect.objectContaining({
        status: courseMock.status,
        isPublic: courseMock.isPublic,
        authorId: courseMock.authorId,
      })
    );
  });
});
