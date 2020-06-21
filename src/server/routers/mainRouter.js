import { Router } from 'express';
import passport from 'passport';

import { loginRouter } from './loginRouter';

export const mainRouter = Router();

mainRouter.use('/login', loginRouter);