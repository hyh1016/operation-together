import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '@/config';
import Container from '@/container';

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET_KEY,
};

export default (): void => {
  passport.use(
    new JwtStrategy(jwtConfig, async (payload, done) => {
      const serviceInstance = Container.get('UserService');
      const user = await serviceInstance.getUser(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    }),
  );
};
