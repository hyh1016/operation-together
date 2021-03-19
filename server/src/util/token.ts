import { sign, verify } from 'jsonwebtoken';
import config from '@/config';

const createUserToken = (id: string): string => {
  const token = sign({ id }, config.SECRET_KEY as string);
  return token;
};

const verifyUserToken = (token: string, id: string): boolean => {
  try {
    const decoded: any = verify(token, config.SECRET_KEY as string);
    if (decoded.id === id) return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};

export { createUserToken, verifyUserToken };
