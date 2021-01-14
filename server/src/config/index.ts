import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default {
  PORT: process.env.PORT,
  DB: {
    TYPE: process.env.DB_TYPE,
    HOST: process.env.HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
  },
};
