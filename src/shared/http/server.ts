import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import routes from './routes';
import errorHandler from './middleware/errors';

import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(3001, () =>
  console.log('🔥 Server is running at http://localhost:3001'),
);
