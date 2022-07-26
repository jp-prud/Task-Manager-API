import ErrorHandler from '@shared/errors/errorHandler';
import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = await UsersService.listUsers();

    return response.status(200).json(users);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, password, organization } = request.body;

    if (!name || !email || !password) {
      return response
        .sendStatus(404)
        .json({ message: 'Field name, email or password is required' });
    }

    await UsersService.createUser({
      name,
      email,
      password,
      phone,
      organization,
    });

    return response.sendStatus(200);
  }
}

export default new UsersController();
