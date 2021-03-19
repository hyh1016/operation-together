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
    const serviceInstance = Container.getOperationService();
    const operationDTO: OperationForm = req.body;
    const operationId = await serviceInstance.createOperation(
      req.user as User,
      operationDTO,
    );
    if (!operationId) return res.status(400).json({ message: 'create failed' });
    res.status(200).json({ operationId });
  });

  router.get('/', async (req, res) => {
    const serviceInstance = Container.getOperationService();
    const operations = await serviceInstance.getOperations(req.user as User);
    if (!operations) return res.status(400).json();
    res.status(200).json({ operations });
  });

  router.get('/:id', async (req, res, next) => {
    const { id: operationId } = req.params;
    if (!isNumber(operationId)) return next();
    const { id: userId } = req.user as User;
    const serviceInstance = Container.getOperationService();
    const isValidUser = await serviceInstance.isJoinedUser(
      userId,
      Number(operationId),
    );
    if (!isValidUser) return res.status(401).json();
    const operation = await serviceInstance.getOperationById(
      Number(operationId),
    );
    if (!operation) return res.status(204).json();
    return res.status(200).json({ operation });
  });

  router.get('/hello', (req, res) => {
    return res.send('hello~');
  });

  router.put('/join', async (req, res) => {
    const { id, password } = req.body;
    const serviceInstance = Container.getOperationService();
    const isJoin = await serviceInstance.joinOperation(req.user as User, {
      id: Number(id),
      password,
    });
    if (!isJoin) return res.status(400).json({ message: 'join failed' });
    return res.status(200).json();
  });

  router.put('/leave/:id', async (req, res, next) => {
    const { id: operationId } = req.params;
    if (!isNumber(operationId)) return next();
    const { id: userId } = req.user as User;
    const serviceInstance = Container.getOperationService();
    const isLeave = await serviceInstance.leaveOperation(
      userId,
      Number(operationId),
    );
    if (!isLeave) return res.status(400).json({ message: 'leave failed' });
    return res.status(200).json();
  });

  router.put('/:id', async (req, res, next) => {
    const { id: operationId } = req.params;
    if (!isNumber(operationId)) return next();
    const { id: userId } = req.user as User;
    const operationDTO: OperationForm = req.body;
    const serviceInstance = Container.getOperationService();
    const isAuthenticated = await serviceInstance.isAdminUser(
      userId,
      Number(operationId),
    );
    if (!isAuthenticated) return res.status(401).json();
    const isUpdated = await serviceInstance.updateOperation(
      Number(operationId),
      operationDTO,
    );
    if (!isUpdated) return res.status(400).json({ message: 'update failed' });
    return res.status(200).json();
  });

  router.delete('/:id', async (req, res, next) => {
    const { id: operationId } = req.params;
    if (!isNumber(operationId)) return next();
    const { id: userId } = req.user as User;
    const serviceInstance = Container.getOperationService();
    const isAuthenticated = await serviceInstance.isAdminUser(
      userId,
      Number(operationId),
    );
    if (!isAuthenticated) return res.status(401).json();
    const isDeleted = await serviceInstance.deleteOperation(
      Number(operationId),
    );
    if (!isDeleted) return res.status(400).json({ message: 'delete failed' });
    return res.status(200).json();
  });
};
