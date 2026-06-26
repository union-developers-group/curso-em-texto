import type { ModuleModelData } from '@/data/models/Module';

export interface CreateModuleData {
  courseId: string;
  title: string;
  order?: number;
  isPublished?: boolean;
}

export interface ModuleRepository {
  create(data: CreateModuleData): Promise<ModuleModelData | null>;
  findById(id: string): Promise<ModuleModelData | null>;
  findByCourseId(courseId: string): Promise<ModuleModelData[]>;
  update(id: string, data: Partial<ModuleModelData>): Promise<ModuleModelData>;
  delete(id: string): Promise<void>;
}
