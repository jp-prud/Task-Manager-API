import User from '../typeorm/entities/User';
import UserRepository from '../repositories/User';
import { getCustomRepository } from 'typeorm';

import ErrorHandler from '@shared/errors/errorHandler';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  organization: string;
}

class UsersService {
  public async listUsers(): Promise<User[] | undefined> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return users;
  }

  public async createUser({
    name,
    email,
    phone,
    password,
    organization,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailAlreadyExists = await userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new ErrorHandler(400, 'Email already exists');
    }

    const user = userRepository.create({
      name,
      email,
      phone,
      password,
      organization,
    });

    userRepository.save(user);

    return user;
  }
}

export default new UsersService();
