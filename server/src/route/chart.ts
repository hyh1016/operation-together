import { Router } from 'express';
import passport from 'passport';
import Container from '@/container';
import User from '@/entity/User';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/charts', router);
  router.use('/', passport.authenticate('jwt', { session: false }));
  router.use('/', async (req, res, next) => {
    const { operationId } = req.body;
    const { id: userId } = req.user as User;
    const serviceInstance = Container.getOperationService();
    const isValidUser = await serviceInstance.isJoinedUser(userId, operationId);
    if (!isValidUser) return res.status(401).json();
    return next();
  });

  router.post('/', async (req, res) => {
    const { id: userId } = req.user as User;
    const { operationId } = req.body;
    const serviceInstance = Container.getChartService();
    const result = await serviceInstance.createChart(userId, operationId);
    if (!result) return res.status(400).json({ message: 'create failed' });
    return res.status(200).json();
  });

  router.get('/', async (req, res) => {
    const { operationId, checkedDate } = req.body;
    const serviceInstance = Container.getChartService();
    const users = await serviceInstance.getCheckedUsers(
      operationId,
      checkedDate,
    );
    if (!users) return res.status(400).json({ message: 'get failed' });
    return res.status(200).json({ users });
  });
};
