import { Router } from 'express';
import Container from '@/container';
import { RegisterForm, LoginForm } from '@/service/userService';
import { createUserToken } from '@/util/token';
import User from '@/entity/User';
import passport from 'passport';

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

  router.get(
    '/me',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const serviceInstance = Container.getUserService();
      const me = await serviceInstance.getMe(req.user as User);
      if (!me) return res.status(400).json('cannot get user');
      return res.status(200).json({ me });
    },
  );

  router.put(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const serviceInstance = Container.getUserService();
      const { id } = req.user as User;
      const { nickname } = req.body;
      const result = await serviceInstance.updateUser(id, nickname);
      if (!result) return res.status(400).json({ message: 'update failed' });
      return res.status(200).json();
    },
  );
};
