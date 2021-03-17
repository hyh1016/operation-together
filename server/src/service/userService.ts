import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import User from '@/entity/User';
import CreateHashPassword from '@/util/encryption';

interface RegisterForm {
  id: string;
  nickname: string;
  password: string;
}

interface LoginForm {
  id: string;
  password: string;
}

export default class UserService {
  constructor(private userRepository: Repository<User>) {}

  async register(info: RegisterForm): Promise<boolean> {
    const isExistUser = await this.getUser(info.id);
    if (isExistUser) return false;
    const hashPassword = await CreateHashPassword(info.password);
    const newUser = this.userRepository.create({
      ...info,
      password: hashPassword,
    });
    await this.userRepository.save(newUser);
    return true;
  }

  async login(info: LoginForm): Promise<boolean | User> {
    const user = await this.userRepository.findOne({ id: info.id });
    if (!user) return false;
    const compareResult = await compare(info.password, user.password);
    if (!compareResult) return false;
    return user;
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ id });
    return user;
  }
}
