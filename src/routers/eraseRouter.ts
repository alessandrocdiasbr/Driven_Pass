import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import * as eraseService from '../services/eraseService';

const eraseRouter = Router();

eraseRouter.use(authenticateToken);

eraseRouter.delete('/', async (req, res) => {
  const userId = res.locals.userId;
  await eraseService.eraseUserData(userId);
  res.sendStatus(204);
});

export default eraseRouter;