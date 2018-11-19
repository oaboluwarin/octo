/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import '../models/User';
import jsonData from '../helpers/users';

const { users } = jsonData;

// Load Idea model
const User = mongoose.model('users');

export default {
  fetchDummyUsers(req, res) {
    res.send(users);
  },
  login(req, res) {
    res.render('users/login');
  },
  register(req, res) {
    res.render('users/register');
  }
}
