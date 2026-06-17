import type { UserModelData } from '@/data/models/User';
import type {
  CreateUserData,
  UserRepository,
} from '@/data/repositories/interfaces/UserRepository';

export const userGoogleProviderMock: UserModelData = {
  id: '1',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  avatar: 'https://example.com/avatar.jpg',
  googleId: '124458',
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userGithubProviderMock: UserModelData = {
  id: '2',
  name: 'Jane Doe',
  email: 'janedoe@gmail.com',
  avatar: 'https://example.com/avatar.jpg',
  githubId: '124458',
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const usersMock = [userGoogleProviderMock, userGithubProviderMock];

export class UserRepositoryStub implements UserRepository {
  create(_: CreateUserData): Promise<UserModelData> {
    return Promise.resolve(userGoogleProviderMock);
  }

  async findByEmail(email: string): Promise<UserModelData | null> {
    return usersMock.find((user) => user.email === email) || null;
  }

  async update(_: string, __: Partial<UserModelData>): Promise<UserModelData> {
    return Promise.resolve(userGoogleProviderMock);
  }

  async findById(id: string): Promise<UserModelData | null> {
    return usersMock.find((user) => user.id === id) || null;
  }
}
