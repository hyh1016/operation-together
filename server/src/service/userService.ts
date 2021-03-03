import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import User from '@/entity/User';
import CreateHashPassword from '@/util/encryption';

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
    const hashPassword = await CreateHashPassword(password);
    const newUser = this.userRepository.create({
      id,
      name,
      password: hashPassword,
    });
    await this.userRepository.save(newUser);
    return true;
  }

  async login({ id, password }: LoginForm): Promise<boolean | User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) return false;
    const compareResult = await compare(password, user.password);
    if (!compareResult) return false;
    return user;
  }

  async validateUser(id: string): Promise<boolean> {
    const isExistUser = await this.userRepository.findOne({ id });
    if (isExistUser) return true;
    return false;
  }
}
