import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '@/config';

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET_KEY,
};

export default () => {
  passport.use(
    new JwtStrategy(jwtConfig, (payload, done) => {
      console.log(payload);
      return done(null, payload);
    }),
  );
};
