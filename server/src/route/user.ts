import { Router, Response } from 'express';
import Container from '@/container';
import { WRONG_KEY } from '@/util/errorMessage';
import passport from 'passport';
import { createUserToken } from '@/util/token';

const router = Router();

export default (indexRouter: Router): void => {
  indexRouter.use('/users', router);

  router.post('/register', async (req, res, next) => {
    const serviceInstance = Container.get('UserService');
    if (!serviceInstance) throw new Error(WRONG_KEY);
    const { id, name, password } = req.body;
    const registResult = await serviceInstance.register({ id, name, password });
    if (!registResult)
      return res.status(400).json({ message: 'This ID already exists.' });
    return res.status(200).json({ success: true });
  });

  router.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req: any, res: Response) => {
      if (!req.user) return res.status(400).json({ message: 'fail login' });
      const token = createUserToken(req.user.id);
      return res.status(200).json({ token });
    },
  );

  router.get('/exist/:id', async (req, res) => {
    const serviceInstance = Container.get('UserService');
    if (!serviceInstance) throw new Error(WRONG_KEY);
    const { id } = req.params;
    const isExistUser = await serviceInstance.validateUser(id);
    if (isExistUser) return res.status(200).json({ exist: true });
    return res.status(204).json({ exist: false });
  });
};
