import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorUtils';

export function errorMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ('statusCode' in error) {
    const { statusCode, message } = error as AppError;
    return res.status(statusCode).json({ message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
}