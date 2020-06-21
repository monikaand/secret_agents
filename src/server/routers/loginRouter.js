import { Router } from 'express';
import passport from 'passport';

export const loginRouter = Router();

// Router path is relative to /login.
loginRouter.post('/',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.json({ msg: 'Hello world' });
  },
);