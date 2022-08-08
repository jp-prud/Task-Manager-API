import AuthService from '@modules/services/AuthService';
import { Request, Response } from 'express';

class AuthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await AuthService.store({ email, password });

    return response.status(200).json({ user });
  }
}

export default new AuthController();
