var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/api/login/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

router.get('/', passport.authenticate('facebook', { scope : 'email' }));

router.get('/callback', passport.authenticate('facebook', { 
  failureRedirect: '/' 
}), function(req, res) {
  res.status(200).send({
    success: true, 
    user: 'Login Successful.'
  });
});

module.exports = router;