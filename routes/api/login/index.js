const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  }
});

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));
router.use('/twitter', require('./twitter'));
router.use('/instagram', require('./instagram'));
router.use('/linkedin', require('./linkedin'));
router.use('/github', require('./github'));

module.exports = router;
