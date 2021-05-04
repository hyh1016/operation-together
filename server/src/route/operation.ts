import { Router } from 'express';
import passport from 'passport';
import Container from '@/container';
import User from '@/entity/User';
import { OperationForm } from '@/service/operationService';
import { isNumber } from '@/util/util';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/operations', router);
  router.use('/', passport.authenticate('jwt', { session: false }));

  router.post('/', async (req, res) => {
    const operationDTO: OperationForm = req.body;
    const serviceInstance = Container.getOperationService();
    const operation = await serviceInstance.createOperation(
      req.user as User,
      operationDTO,
    );
    if (!operation) return res.status(400).json({ message: 'create failed' });
    res.status(200).json({ operation });
  });

  router.put('/join', async (req, res) => {
    const { id, code } = req.body;
    const serviceInstance = Container.getOperationService();
    const operation = await serviceInstance.joinOperation(req.user as User, {
      id: Number(id),
      code,
    });
    if (!operation) return res.status(400).json({ message: 'join failed' });
    return res.status(200).json({ operation });
  });

  router.use('/:id', async (req, res, next) => {
    const { id: operationId } = req.params;
    if (!isNumber(operationId)) return next();
    const { id: userId } = req.user as User;
    const serviceInstance = Container.getOperationService();
    const isValidUser = await serviceInstance.isJoinedUser(
      userId,
      Number(operationId),
    );
    if (!isValidUser) return res.status(401).end();
    return next();
  });

  router.get('/:id', async (req, res, next) => {
    const { id: operationId } = req.params;
    if (!isNumber(operationId)) return next();
    const serviceInstance = Container.getOperationService();
    const operation = await serviceInstance.getOperationById(
      Number(operationId),
    );
    if (!operation) return res.status(400).json({ message: 'read failed' });
    return res.status(200).json({ operation });
  });

  router.put('/:id/leave', async (req, res, next) => {
    const { id: operationId } = req.params;
    if (!isNumber(operationId)) return next();
    const { id: userId } = req.user as User;
    const serviceInstance = Container.getOperationService();
    const isLeave = await serviceInstance.leaveOperation(
      userId,
      Number(operationId),
    );
    if (!isLeave) return res.status(400).json({ message: 'leave failed' });
    return res.status(200).end();
  });

  router.put('/:id', async (req, res, next) => {
    const { id: operationId } = req.params;
    if (!isNumber(operationId)) return next();
    const operationDTO: OperationForm = req.body;
    const { id: userId } = req.user as User;
    const serviceInstance = Container.getOperationService();
    const isAuthenticated = await serviceInstance.isAdminUser(
      userId,
      Number(operationId),
    );
    if (!isAuthenticated) return res.status(401).end();
    const isUpdated = await serviceInstance.updateOperation(
      Number(operationId),
      operationDTO,
    );
    if (!isUpdated) return res.status(400).json({ message: 'update failed' });
    return res.status(200).end();
  });
};
