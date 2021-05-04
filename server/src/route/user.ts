import { Router } from 'express';
import passport from 'passport';
import Container from '@/container';
import User from '@/entity/User';
import { RegisterForm, LoginForm } from '@/service/userService';
import { createUserToken } from '@/util/token';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/users', router);

  router.post('/register', async (req, res) => {
    const userDTO: RegisterForm = req.body;
    const serviceInstance = Container.getUserService();
    const registResult = await serviceInstance.register(userDTO);
    if (!registResult)
      return res.status(400).json({ message: 'registration failed' });
    return res.status(200).end();
  });

  router.post('/login', async (req, res) => {
    const userDTO: LoginForm = req.body;
    const serviceInstance = Container.getUserService();
    const user = await serviceInstance.login(userDTO);
    if (!user) return res.status(400).json({ message: 'login failed' });
    const token = createUserToken(user.id);
    return res.status(200).json({ token });
  });

  router.get('/exist/:id', async (req, res) => {
    const { id } = req.params;
    const serviceInstance = Container.getUserService();
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
      if (!me) return res.status(400).json({ message: 'cannot get user' });
      return res.status(200).json({ me });
    },
  );

  router.put(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { nickname } = req.body;
      const { id } = req.user as User;
      const serviceInstance = Container.getUserService();
      const result = await serviceInstance.updateUser(id, nickname);
      if (!result) return res.status(400).json({ message: 'update failed' });
      return res.status(200).end();
    },
  );
};
