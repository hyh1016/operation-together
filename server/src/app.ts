import express from 'express';
import { createConnection, getRepository } from 'typeorm';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './util/passport';
import config from './config';
import Router from './route';
import Container from './container';
import User from './entity/User';
import { UserService } from './service/UserService';
import Operation from './entity/Operation';
import { OperationService } from './service/operationService';
import Chart from './entity/Chart';
import { ChartService } from './service/chartService';

const startServer = async () => {
  await createConnection()
    .then(() => {
      Container.setInstance(
        'UserService',
        new UserService(getRepository(User)),
      );
      Container.setInstance(
        'OperationService',
        new OperationService(getRepository(Operation)),
      );
      Container.setInstance(
        'ChartService',
        new ChartService(getRepository(Chart)),
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

  app.use((req, res) => {
    res.status(404).json({ message: 'unhandled request' });
  });

  app.listen(PORT, () => {
    console.log(`Server listen http://localhost:${PORT}`);
  });
};

startServer();
