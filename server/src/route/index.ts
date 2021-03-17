import { Router } from 'express';
import operation from './operation';
import user from './user';

export default (): Router => {
  const router = Router();
  user(router);
  operation(router);

  return router;
};
