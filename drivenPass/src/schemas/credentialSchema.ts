import Joi from 'joi';
import { CredentialData } from '../types/credentialTypes';

export const credentialSchema = Joi.object<CredentialData>({
  title: Joi.string().required(),
  url: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
});