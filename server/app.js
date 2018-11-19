 /* eslint-disable no-console */
import express from 'express';
import logger from 'morgan';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import { userRouter } from './routes';
import './models/Idea';

// initialize app
const app = express();

// Connect mongoose
mongoose.connect('mongodb://localhost/octojot-dev', {
  useNewUrlParser: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Load Idea model
const Idea = mongoose.model('ideas');

// Specify middlewares
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Template engine config
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Routes section
app.get('/', (req, res) => res.json({ message: 'Welcome to octo' }));

app.get('/home', (req, res) => {
  const title = 'Home';
  res.render('home', {
    title,
  });
});

app.get('/about', (req, res) => {
  const title = 'About';
  res.render('about', {
    title,
  });
});

// Ideas Index Page
app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => res.render('ideas/index', { ideas }));
});

// Add ideas form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Edit ideas form
app.get('/ideas/edit/:id', (req, res) => {
  const { id } = req.params;
  Idea.findOne({
    _id: id
  })
    .then(idea => {
      console.log('THE IDEA', idea);
      res.render('ideas/edit', { idea });
    });
});

// Process Form
app.post('/ideas', (req, res) => {
  const errors = [];
  const { title, details } = req.body;
  if (!title) errors.push({ text: 'Please, add a title' });
  if (!details) errors.push({ text: 'Please, add details' });

  if (errors.length) {
    return res.render('ideas/add', { errors, title, details });
  }
  const newUser = { title, details };
  return new Idea(newUser)
    .save()
    .then(() => {
      res.redirect('/ideas');
    })
    .catch(err => {
      console.log(err);
    });
});

app.use('/user', userRouter);

export default app;
