import { Router } from 'express';
import user from './user';
import operation from './operation';
import chart from './chart';

export default (): Router => {
  const router = Router();
  user(router);
  operation(router);
  chart(router);

  return router;
};
