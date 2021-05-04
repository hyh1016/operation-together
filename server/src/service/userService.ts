import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import User from '@/entity/User';
import CreateHashPassword from '@/util/encryption';

export interface RegisterForm {
  id: string;
  nickname: string;
  password: string;
}

export interface LoginForm {
  id: string;
  password: string;
}

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async register(info: RegisterForm): Promise<boolean> {
    if (Object.values(info).filter((v) => !v).length > 0) return false;
    const isExistUser = await this.getUser(info.id);
    if (isExistUser) return false;
    const hashPassword = await CreateHashPassword(info.password);
    try {
      const newUser = this.userRepository.create({
        ...info,
        password: hashPassword,
      });
      await this.userRepository.save(newUser);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }

  async login(info: LoginForm): Promise<User | undefined> {
    if (Object.values(info).filter((v) => !v).length > 0) return undefined;
    try {
      const user = await this.userRepository.findOne({ id: info.id });
      if (!user) return undefined;
      const compareResult = await compare(info.password, user.password);
      if (!compareResult) return undefined;
      return user;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    if (!id) return undefined;
    try {
      const user = await this.userRepository.findOne({ id });
      return user;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getMe(user: User): Promise<User | undefined> {
    if (!user) return undefined;
    try {
      const me = await this.userRepository.findOne({
        select: ['id', 'nickname'],
        where: { id: user.id },
        relations: ['operations'],
      });
      return me;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async updateUser(id: string, nickname: string): Promise<boolean> {
    if (!id || !nickname) return false;
    try {
      await this.userRepository.update({ id }, { nickname });
      return true;
    } catch (error) {
      return false;
    }
  }
}
