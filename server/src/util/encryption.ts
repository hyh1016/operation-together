import { genSalt, hash } from 'bcrypt';
import config from '@/config';
const saltRound = Number(config.SALT_ROUND);

const createHashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(saltRound);
  const hashPassword = await hash(password, salt);
  return hashPassword;
};

export default createHashPassword;
