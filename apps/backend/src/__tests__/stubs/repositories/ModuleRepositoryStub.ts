import type { ModuleModelData } from '@/data/models/Module';
import type {
  CreateModuleData,
  ModuleRepository,
} from '@/data/repositories/interfaces/ModuleRepository';

export const moduleDataMock: ModuleModelData = {
  id: crypto.randomUUID(),
  courseId: crypto.randomUUID(),
  title: 'Programação Assíncrona',
  order: 0,
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const moduleManyDataMock: ModuleModelData[] = [
  { ...moduleDataMock },
  {
    id: crypto.randomUUID(),
    courseId: crypto.randomUUID(),
    title: 'Node.js',
    order: 0,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class ModuleRepositoryStub implements ModuleRepository {
  async create(_: CreateModuleData): Promise<ModuleModelData> {
    return moduleDataMock;
  }

  async findById(id: string): Promise<ModuleModelData | null> {
    return moduleManyDataMock.find((module) => module.id === id) ?? null;
  }

  async findByCourseId(courseId: string): Promise<ModuleModelData[]> {
    return moduleManyDataMock.filter((module) => module.courseId === courseId);
  }

  async update(
    _: string,
    __: Partial<ModuleModelData>
  ): Promise<ModuleModelData> {
    return Promise.resolve(moduleDataMock);
  }

  async delete(_: string): Promise<void> {
    return;
  }
}
