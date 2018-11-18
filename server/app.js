import express from 'express';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));

app.get('/', (req, res) => {
  return res.json({ message: 'Welcome to octo' });
})

export default app;
