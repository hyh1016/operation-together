import { Router } from 'express';
import Container from '@/container';
import passport from 'passport';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/operations', router);
  router.use('/', passport.authenticate('jwt', { session: false }));

  router.get('/', async (req, res) => {
    const serviceInstance = Container.get('OperationService');
    const operations = await serviceInstance.getOperations(req.user);
    res.status(200).json({ operations });
  });

  router.post('/', async (req, res) => {
    const serviceInstance = Container.get('OperationService');
    const { title, startDate, endDate, color } = req.body;
    if (!title || !startDate || !endDate || !color)
      return res.status(400).json({ message: 'create failed.' });
    const operationId = await serviceInstance.createOperation(req.user, {
      title,
      startDate,
      endDate,
      color,
    });
    res.status(200).json({ operationId });
  });
};
