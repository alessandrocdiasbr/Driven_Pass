import { Router } from 'express';

import healthRouter from './healthRouter';
import authRouter from './authRouter';
import credentialRouter from './credentialRouter';
import eraseRouter from './eraseRouter';

const router = Router();

router.use('/health', healthRouter);
router.use('/sign-up', authRouter.signUpRouter);
router.use('/sign-in', authRouter.signInRouter);
router.use('/credentials', credentialRouter);
router.use('/erase', eraseRouter);

export default router;