import express from 'express';
import { usersController } from '../controllers';

const { login, register, fetchDummyUsers } = usersController;

const router = express.Router();

router.route('/all')
  .get(fetchDummyUsers);

router.route('/login')
  .get(login);

router.route('/register')
  .get(register);

export default router;
