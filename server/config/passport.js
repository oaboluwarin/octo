import passportLocal from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const LocalStrategy = passportLocal.Strategy;

// Load User model
const User = mongoose.model('users');

export default function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.findOne({
      email
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'No User Found' });
      }

      // Match password
      return bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: 'Password incorrect' });
      });
    });
  }));
}
