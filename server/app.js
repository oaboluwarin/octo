/* eslint-disable no-param-reassign */
 /* eslint-disable no-console */
import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import flash from 'connect-flash';
import session from 'express-session';
import {
  usersRouter,
  ideasRouter,
  homeRouter,
  aboutRouter
} from './routes';
import passportFunction from './config/passport';

passportFunction(passport);

// initialize app
const app = express();

// Connect mongoose
mongoose.connect('mongodb://localhost/octojot-dev', {
  useNewUrlParser: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Specify middlewares
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Template engine config
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Routes section
app.get('/', (req, res) => res.json({ message: 'Welcome to OctoJot' }));

app.use('/users', usersRouter);
app.use('/ideas', ideasRouter);
app.use('/home', homeRouter);
app.use('/about', aboutRouter);

export default app;
