import { Router } from 'express';
import Container from '@/container';
import { RegisterForm, LoginForm } from '@/service/userService';
import { createUserToken } from '@/util/token';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/users', router);

  router.post('/register', async (req, res) => {
    const serviceInstance = Container.getUserService();
    const userDTO: RegisterForm = req.body;
    const registResult = await serviceInstance.register(userDTO);
    if (!registResult)
      return res.status(400).json({ message: 'registration failed' });
    return res.status(200).json({ success: true });
  });

  router.post('/login', async (req, res) => {
    const serviceInstance = Container.getUserService();
    const userDTO: LoginForm = req.body;
    const user = await serviceInstance.login(userDTO);
    if (!user) return res.status(400).json({ message: 'login failed' });
    const token = createUserToken(user.id);
    return res.status(200).json({ token });
  });

  router.get('/exist/:id', async (req, res) => {
    const serviceInstance = Container.getUserService();
    const { id } = req.params;
    const user = await serviceInstance.getUser(id);
    if (!user) return res.status(200).json({ exist: false });
    return res.status(200).json({ exist: true });
  });
};
