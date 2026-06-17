import type { UserModelData } from '@/data/models/User';

export interface CreateUserData {
  email: string;
  name: string;
  avatar?: string | null;
  googleId?: string;
  githubId?: string;
  role?: string;
}

export interface UserRepository {
  create(data: CreateUserData): Promise<UserModelData>;
  findByEmail(email: string): Promise<UserModelData | null>;
  update(id: string, data: Partial<UserModelData>): Promise<UserModelData>;
  findById(id: string): Promise<UserModelData | null>;
}
