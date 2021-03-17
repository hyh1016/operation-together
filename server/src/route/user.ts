import { Router } from 'express';
import Container from '@/container';
import { createUserToken } from '@/util/token';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/users', router);

  router.post('/register', async (req, res) => {
    const serviceInstance = Container.get('UserService');
    const { id, nickname, password } = req.body;
    const registResult = await serviceInstance.register({
      id,
      nickname,
      password,
    });
    if (!registResult)
      return res.status(400).json({ message: 'This ID already exists.' });
    return res.status(200).json({ success: true });
  });

  router.post('/login', async (req, res) => {
    const serviceInstance = Container.get('UserService');
    const { id, password } = req.body;
    const user = await serviceInstance.login({ id, password });
    if (!user) return res.status(400).json({ message: 'failed login' });
    const token = createUserToken(user.id);
    return res.status(200).json({ token });
  });

  router.get('/exist/:id', async (req, res) => {
    const serviceInstance = Container.get('UserService');
    const { id } = req.params;
    const user = await serviceInstance.getUser(id);
    if (user) return res.status(200).json({ exist: true });
    return res.status(200).json({ exist: false });
  });
};
