import { Request, Response, NextFunction } from 'express';

import ErrorHandler from '@shared/errors/errorHandler';

import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ErrorHandler(400, 'JWT is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new ErrorHandler(400, 'JWT token is missing');
  }
}
