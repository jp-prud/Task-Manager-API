import User from '../typeorm/entities/User';
import UserRepository from '../repositories/User';
import { getCustomRepository } from 'typeorm';

import ErrorHandler from '@shared/errors/errorHandler';
import { hash } from 'bcryptjs';

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

  public async getUser(userId: string): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ErrorHandler(404, `User not found`);
    }

    return user;
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

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      organization,
    });

    userRepository.save(user);

    return user;
  }

  public async updateUser(
    userId: string,
    { name, email, phone, password, organization }: IRequest,
  ): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }

    const emailAlreadyExists = await userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new ErrorHandler(404, 'Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.password = hashedPassword;
    user.organization = organization;

    userRepository.save(user);

    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }

    userRepository.remove(user);
  }
}

export default new UsersService();
