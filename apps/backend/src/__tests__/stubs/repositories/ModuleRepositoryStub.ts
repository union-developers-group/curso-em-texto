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

export class ModuleRepositoryStub implements ModuleRepository {
  async create(_: CreateModuleData): Promise<ModuleModelData> {
    return moduleDataMock;
  }
}
