import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import errors from './middleware/errors';

import '@shared/typeorm';

const app = express();

app.use(cors);
app.use(express.json());
app.use(routes);

app.use(errors);

app.listen('3333', () =>
  console.log('Server is running at http://localhost:3333 🔥'),
);
