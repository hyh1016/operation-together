import { Repository } from 'typeorm';
import User from '@/entity/User';

interface RegisterForm {
  id: string;
  name: string;
  password: string;
}

interface LoginForm {
  id: string;
  password: string;
}

export default class UserService {
  constructor(private userRepository: Repository<User>) {}

  async register({ id, name, password }: RegisterForm): Promise<boolean> {
    const isExistUser = await this.validateUser(id);
    if (isExistUser) return false;

    const newUser = this.userRepository.create({ id, name, password });
    await this.userRepository.save(newUser);
    return true;
  }

  async login({ id, password }: LoginForm): Promise<boolean> {
    const isExistUser = await this.userRepository.findOne({ id, password });
    if (isExistUser) return true;
    return false;
  }

  async validateUser(id: string): Promise<boolean> {
    const isExistUser = await this.userRepository.findOne({ id });
    if (isExistUser) return true;
    return false;
  }
}
