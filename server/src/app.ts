import express from 'express';
import { createConnection, getRepository } from 'typeorm';
import cors from 'cors';
import createError from 'http-errors';
import passport from 'passport';
import passportConfig from './util/passport';
import config from './config';
import Router from './route';
import Container from './container';
import UserService from './service/UserService';
import OperationService from './service/operationService';
import User from './entity/User';
import Operation from './entity/Operation';

const startServer = async () => {
  await createConnection()
    .then(() => {
      Container.set('UserService', new UserService(getRepository(User)));
      Container.set(
        'OperationService',
        new OperationService(getRepository(Operation)),
      );
    })
    .catch((err) => {
      console.error(err);
    });

  const app = express();

  const PORT = config.PORT || 4000;

  app.use(passport.initialize());
  passportConfig();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  app.use('/', Router());

  // TODO: error handling
  app.use((_, __, next) => {
    next(createError(404));
  });

  app.listen(PORT, () => {
    console.log(`Server listen http://localhost:${PORT}`);
  });
};

startServer();
