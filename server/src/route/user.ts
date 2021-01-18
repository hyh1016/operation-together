import { Router } from 'express';
import Container from '@/container';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/users', router);

  router.post('/register', async (req, res) => {
    const serviceInstance = Container.get('UserService');
    const { id, name, password } = req.body;
    const registResult = await serviceInstance.register({ id, name, password });
    if (registResult) return res.status(200).json({ status: 'success' });
    return res.status(400).json({ status: 'fail' });
  });

  router.post('/login', async (req, res) => {
    const serviceInstance = Container.get('UserService');
    const { id, password } = req.body;
    const successLogin = await serviceInstance.login({ id, password });
    if (successLogin) return res.status(200).json({ status: 'success' });
    return res.status(404).json({ status: 'fail' });
  });
};
