import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

import UsersController from '@modules/controllers/UsersController';
import AuthController from '@modules/controllers/AuthController';

import auth from './middleware/auth';

router.get('/users', auth, UsersController.index);
router.get('/users/:id', UsersController.show);
router.post(
  '/users',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required,
  //     email: Joi.string().email().required,
  //     password: Joi.string().required,
  //     organization: Joi.string().required,
  //     phone: Joi.string(),
  //   },
  // }),
  UsersController.store,
);
router.put('/users/:id', UsersController.update);
router.delete('/users/:id', UsersController.delete);

router.post(
  '/auth',
  // celebrate({
  //   [Segments.BODY]: {
  //     email: Joi.string().email().required,
  //     password: Joi.string().required,
  //   },
  // }),
  AuthController.index,
);

export default router;
