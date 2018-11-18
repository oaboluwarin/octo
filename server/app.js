import express from 'express';
import logger from 'morgan';
import { userRouter } from './routes';

const app = express();

app.use(logger('dev'));

app.get('/', (req, res) => {
  return res.json({ message: 'Welcome to octo' });
});

app.use('/user', userRouter);

export default app;
