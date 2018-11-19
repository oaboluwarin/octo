import express from 'express';
import { usersController } from '../controllers';

const {
  login,
  loginForm,
  register,
  registerForm,
  fetchDummyUsers,
} = usersController;

const router = express.Router();

router.route('/all')
  .get(fetchDummyUsers);

router.route('/login')
  .get(login)
  .post(loginForm);

router.route('/register')
  .get(registerForm)
  .post(register);

export default router;
