import { Repository } from 'typeorm';
import { User } from '@/entity/User';

interface LoginForm {
  id: string;
  password: string;
}

export default class UserService {
  constructor(private userRepository: Repository<User>) {}

  async register(user: User): Promise<boolean> {
    const isExistUser = await this.validateUser(user.id);
    if (isExistUser) return false;

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return true;
  }

  async login({ id, password }: LoginForm): Promise<boolean> {
    const isExistUser = await this.userRepository.findOne({ id, password });
    if (isExistUser) return true;
    return false;
  }

  private async validateUser(id: string): Promise<boolean> {
    const isExistUser = await this.userRepository.findOne({ id });
    if (isExistUser) return true;
    return false;
  }
}
