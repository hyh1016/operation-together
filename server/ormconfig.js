import config from './src/config';

export default {
  type: config.DB.TYPE,
  host: config.DB.HOST,
  port: config.DB.PORT,
  username: config.DB.USERNAME,
  password: config.DB.PASSWORD,
  database: config.DB.NAME,
};
