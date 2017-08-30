var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersData = require('../../../models/users-data-schema');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    usersData.findById(id, function(err, user) {
      done(err, user);
    });
  }
});

router.use('/mongoose', require('./mongoose'));
router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));
router.use('/twitter', require('./twitter'));
router.use('/instagram', require('./instagram'));

module.exports = router;