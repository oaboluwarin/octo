import express from 'express';
import { usersController } from '../controllers';

const {
  login,
  loginForm,
  logUserOut,
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

router.route('/logout')
  .get(logUserOut);

export default router;
