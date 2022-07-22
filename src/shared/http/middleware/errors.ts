import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '@shared/errors/errorHandler';

export default (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof ErrorHandler) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error?.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
};
