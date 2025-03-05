import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { unprocessableEntityError, badRequestError } from '../utils/errorUtils';

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw unprocessableEntityError(errors.join(', '));
    }
    
    next();
  };
}

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const numId = parseInt(id);
  
  if (isNaN(numId) || numId <= 0) {
    throw badRequestError('ID must be a positive number');
  }
  
  next();
}