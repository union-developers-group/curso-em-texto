import type { ModuleModelData } from '@/data/models/Module';

export interface CreateModuleData {
  courseId: string;
  title: string;
  order?: number;
  isPublished?: boolean;
}

export interface ModuleRepository {
  create(data: CreateModuleData): Promise<ModuleModelData>;
}
