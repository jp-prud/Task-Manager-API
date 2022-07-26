import ErrorHandler from '@shared/errors/errorHandler';
import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = await UsersService.listUsers();

    return response.status(200).json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user = await UsersService.getUser(id);

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).json(user);
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

  public async update(request: Request, response: Response) {
    const { id, name, email, password, phone, organization } = request.params;

    if (!id) {
      throw new ErrorHandler(404, 'Id is required');
    }

    await UsersService.updateUser(id, {
      name,
      email,
      password,
      phone,
      organization,
    });

    response.sendStatus(200);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      throw new ErrorHandler(404, 'Id is required');
    }

    await UsersService.deleteUser(id);

    return response.status(200);
  }
}

export default new UsersController();
