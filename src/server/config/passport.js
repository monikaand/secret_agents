import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const dummyUser = {
  username: 'Scott',
  password: 'Tiger',
};

export function initialisePassport() {
  passport.use(new LocalStrategy(
    {
      usernameField: 'user',
      passwordField: 'pwd',
    },
    (username, password, done) => {
      if (username === dummyUser.username && password === dummyUser.password) {
        return done(null, { user: dummyUser.username });
      }
      return done(null, false);
    },
  ));
}