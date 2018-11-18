import express from 'express';
import jsonData from '../helpers/users';

const { users } = jsonData;

const router = express.Router();

router.get('/all', (req, res) => {
  res.send(users);
});

export default router;
