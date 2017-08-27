var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

passport.use(new Strategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'api/login/twitter/callback'
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile); 
}));

router.get('/', passport.authenticate('twitter'));

router.get('/callback', passport.authenticate('twitter', { 
  failureRedirect: '/' 
}), function(req, res) {
  res.status(200).send({
    success: true, 
    user: 'Login Successful.'
  });
});

module.exports = router;