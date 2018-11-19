import express from 'express';
import logger from 'morgan';
import exphbs  from 'express-handlebars';
import { userRouter } from './routes';

const app = express();

app.use(logger('dev'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  return res.json({ message: 'Welcome to octo' });
});

app.use('/user', userRouter);

export default app;
