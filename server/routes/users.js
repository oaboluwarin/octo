import express from 'express';
import jsonData from '../helpers/users';

const { users } = jsonData;

const router = express.Router();

router.route('/all')
  .get((req, res) => {
    res.send(users);
  });

router.route('/login')
  .get((req, res) => {
    res.send('login');
  });

router.route('/register')
  .get((req, res) => {
    res.send('register');
  });

export default router;
