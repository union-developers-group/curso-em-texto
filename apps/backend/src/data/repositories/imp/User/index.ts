import { eq } from 'drizzle-orm';

import type { UserModelData } from '@/data/models/User';
import type {
  CreateUserData,
  UserRepository,
} from '@/data/repositories/interfaces/UserRepository';

import { db, usersTable } from '@/data';

export class UserRepositoryImp implements UserRepository {
  async create(data: CreateUserData): Promise<UserModelData> {
    const [result] = await db.insert(usersTable).values(data).returning();

    return result;
  }

  async findByEmail(email: string): Promise<UserModelData | null> {
    const [result] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return result || null;
  }

  async update(
    id: string,
    data: Partial<UserModelData>
  ): Promise<UserModelData> {
    const [result] = await db
      .update(usersTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(usersTable.id, id))
      .returning();

    return result;
  }

  async findById(id: string): Promise<UserModelData | null> {
    const [result] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    return result ?? null;
  }
}
