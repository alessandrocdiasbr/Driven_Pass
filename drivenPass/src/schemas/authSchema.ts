import Joi from 'joi';
import { SignUpData, SignInData } from '../types/authTypes';

export const signUpSchema = Joi.object<SignUpData>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const signInSchema = Joi.object<SignInData>({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});