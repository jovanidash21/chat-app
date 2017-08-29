var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-google-oauth2').Strategy;
var usersData = require('../../../models/users-data-schema');

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/login/google/callback'
}, function(req, accessToken, refreshToken, profile, done) {
  var username = 'google/' + profile.id;
  var name = profile.displayName;
  var email;
  var profilePicture;

  if (profile.emails[0].value) {
    email = profile.emails[0].value;
  }
  else {
    email = '';
  }

  if (profile.photos[0].value) {
    profilePicture = profile.photos[0].value;
  }
  else {
    profilePicture = '';
  }

  usersData.findOne({username: username}, function(err, user) {
    if (!err) {
      if (user === null) {
        var newUser = new usersData({
          username: username,
          name: name,
          email: email,
          profilePicture: profilePicture
        });

        newUser.save(function(err) {
          if (!err) {
            return done(null, newUser);
          } 
          else {
            return done(err);
          }
        });
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