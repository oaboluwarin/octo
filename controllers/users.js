/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import '../models/User';
import users from '../helpers/users';

// Load Idea model
const User = mongoose.model('users');

export default {
  fetchDummyUsers(req, res) {
    res.send(users);
  },
  login(req, res) {
    res.render('users/login');
  },
  loginForm(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/ideas',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  },
  registerForm(req, res) {
    res.render('users/register');
  },
  register(req, res) {
    const errors = [];
    const {
      email,
      name,
      password,
      password2,
    } = req.body;

    if (password !== password2) errors.push({ text: 'Passwords do not match' });
    if (password.length < 4) errors.push({ text: 'Password must be at least 4 characters '});
    if (!name) errors.push({ text: 'The name field should not be empty' });
    if (!email) errors.push({ text: 'Please, supply a valid email' });

    if (errors.length) {
      return res.render('users/register', {
        errors,
        name,
        email,
        password,
        password2
      });
    }
    return User.findOne({
      email
    })
      .then(user => {
        if (user) {
          req.flash('error_msg', 'Email already registered');
          res.redirect('/users/login');
        }
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'Registration Successful!');
                res.redirect('/users/login');
              })
              .catch(errs => console.log(errs));
          });
        });
      });
  },
  logUserOut(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  }
};
