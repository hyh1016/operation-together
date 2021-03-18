import { Router } from 'express';
import Container from '@/container';
import passport from 'passport';
import User from '@/entity/User';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/operations', router);
  router.use('/', passport.authenticate('jwt', { session: false }));

  router.post('/', async (req, res) => {
    const serviceInstance = Container.getOperationService();
    const { title, startDate, endDate, color } = req.body;
    const operationId = await serviceInstance.createOperation(
      req.user as User,
      {
        title,
        startDate,
        endDate,
        color,
      },
    );
    if (!operationId) return res.status(400).json({ message: 'create failed' });
    res.status(200).json({ operationId });
  });

  router.get('/', async (req, res) => {
    const serviceInstance = Container.getOperationService();
    const operations = await serviceInstance.getOperations(req.user as User);
    res.status(200).json({ operations });
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const serviceInstance = Container.getOperationService();
    const operation = await serviceInstance.getOperationById(Number(id));
    if (!operation) return res.status(204).json();
    return res.status(200).json({ operation });
  });

  router.put('/:id', async (req, res) => {
    const { id: operationId } = req.params;
    const { id: userId } = req.user as User;
    const { title, startDate, endDate, color, adminId } = req.body;
    const serviceInstance = Container.getOperationService();
    const isAuthenticated = await serviceInstance.isAdminUser(
      userId,
      Number(operationId),
    );
    if (!isAuthenticated) return res.status(401).json();
    const isUpdated = await serviceInstance.updateOperation(
      Number(operationId),
      {
        title,
        startDate,
        endDate,
        color,
        adminId,
      },
    );
    if (!isUpdated) return res.status(400).json({ message: 'update failed' });
    return res.status(200).json();
  });

  router.delete('/:id', async (req, res) => {
    const { id: operationId } = req.params;
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
