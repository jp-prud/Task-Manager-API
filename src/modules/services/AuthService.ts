import UserRepository from '@modules/repositories/User';
import User from '@modules/typeorm/entities/User';

import ErrorHandler from '@shared/errors/errorHandler';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import { getCustomRepository } from 'typeorm';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthService {
  public async store({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    if (!email || !password) {
      throw new ErrorHandler(404, `All fields is required`);
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ErrorHandler(401, `Incorrect email or password combination`);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new ErrorHandler(401, `Incorrect email or password combination`);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn, // 1 Day
    });

    return {
      user,
      token,
    };
  }
}

export default new AuthService();
