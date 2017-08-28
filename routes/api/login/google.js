var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-google-oauth2').Strategy;
var usersData = require('../../../models/users-data-schema');

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'api/login/google/callback',
  profileFields: ['id', 'name', 'emails']
}, function(req, accessToken, refreshToken, profile, done) {
  usersData.findOne({profileID: profile.id}, function(err, user) {
    if (!err) {
      if (user === null) {
        var newUser = new usersData({
          profileID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: (profile.emails[0].value || '')
        });
        newUser.save(function(err) {
          if (!err) {
            return done(null, newUser);
          } 
          else {
            return done(err);
          }
        });
        console.log(profile.id);
      }
      else {
        return done(null, user);
      }
    }
    else {
      return done(err);
    }
  });
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