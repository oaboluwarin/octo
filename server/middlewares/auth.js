export default {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/users/login');
  }
};
