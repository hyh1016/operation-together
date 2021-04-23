import { Router } from 'express';
import passport from 'passport';
import Container from '@/container';
import User from '@/entity/User';
import { isNumber } from '@/util/util';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/charts', router);
  router.use('/', passport.authenticate('jwt', { session: false }));

  router.post('/', async (req, res, next) => {
    const { id: userId } = req.user as User;
    const { operationId } = req.body;
    if (!isNumber(operationId)) return next();
    const operationInstance = Container.getOperationService();
    const isValidUser = await operationInstance.isJoinedUser(
      userId,
      Number(operationId),
    );
    if (!isValidUser) return res.status(401).json();

    const chartInstance = Container.getChartService();
    const result = await chartInstance.createChart(userId, operationId);
    if (!result) return res.status(400).json({ message: 'create failed' });

    return res.status(200).json();
  });

  router.get('/:id/:date', async (req, res, next) => {
    const { id: operationId, date: checkedDate } = req.params;
    const { id: userId } = req.user as User;
    if (!isNumber(operationId)) return next();
    const operationInstance = Container.getOperationService();
    const isValidUser = await operationInstance.isJoinedUser(
      userId,
      Number(operationId),
    );
    if (!isValidUser) return res.status(401).json();

    const chartInstance = Container.getChartService();
    const users = await chartInstance.getCheckedUsers(
      Number(operationId),
      checkedDate,
    );
    if (!users) return res.status(400).json({ message: 'get failed' });
    return res.status(200).json({ users });
  });
};
