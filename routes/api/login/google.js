var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-google-oauth2').Strategy;

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'api/login/google/callback'
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile); 
}));

router.get('/', passport.authenticate('google', { 
  scope: [ 
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read' 
  ] 
}));

router.get('/callback', passport.authenticate('google', { 
  failureRedirect: '/' 
}), function(req, res) {
  res.status(200).send({
    success: true, 
    user: 'Login Successful.'
  });
});

module.exports = router;