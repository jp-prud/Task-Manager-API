import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

import UsersController from '@modules/controllers/UsersController';

router.get('/users', UsersController.index);
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

export default router;
