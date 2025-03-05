import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateSchema } from '../middlewares/validationMiddleware';
import { signUpSchema, signInSchema } from '../schemas/authSchema';

const signUpRouter = Router();
const signInRouter = Router();

signUpRouter.post('/', validateSchema(signUpSchema), authController.signUp);
signInRouter.post('/', validateSchema(signInSchema), authController.signIn);

export default {
  signUpRouter,
  signInRouter
};