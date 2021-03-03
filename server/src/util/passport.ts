import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Container from '@/container';
import { WRONG_KEY, WRONG_DATA } from './errorMessage';
import User from '@/entity/User';

const passportConfig = { usernameField: 'id', passwordField: 'password' };

const passportVerify = async (id: string, password: string, done: any) => {
  try {
    const serviceInstance = Container.get('UserService');
    if (!serviceInstance) throw new Error(WRONG_KEY);
    const user = await serviceInstance.login({ id, password });
    if (!user) done(null, false, WRONG_DATA);
    done(null, user);
  } catch (e) {
    console.error(e);
    done(e);
  }
};

export default (): void => {
  passport.serializeUser((user, done) => {
    return done(null, user);
  });
  passport.deserializeUser((user: User, done) => {
    return done(null, user);
  });
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
};
