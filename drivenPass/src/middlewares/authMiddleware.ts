import { Request, Response, NextFunction } from 'express';
import { unauthorizedError } from '../utils/errorUtils';
import { validateToken } from '../utils/cryptUtils';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    throw unauthorizedError('Missing token');
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const payload = validateToken(token);
    res.locals.userId = payload.userId;
    next();
  } catch (error) {
    throw unauthorizedError('Invalid token');
  }
}