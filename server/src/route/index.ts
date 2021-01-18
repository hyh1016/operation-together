import { Router } from 'express';
import user from './user';

export default (): Router => {
  const router = Router();
  user(router);

  return router;
};
