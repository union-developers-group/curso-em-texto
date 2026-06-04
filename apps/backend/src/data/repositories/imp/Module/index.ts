import { db, modulesTable } from '@/data';

import type { ModuleModelData } from '@/data/models/Module';

import type {
  CreateModuleData,
  ModuleRepository,
} from '../../interfaces/ModuleRepository';

export class ModuleRepositoryImp implements ModuleRepository {
  async create(data: CreateModuleData): Promise<ModuleModelData> {
    const [result] = await db.insert(modulesTable).values(data).returning();

    return result;
  }
}
