var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-linkedin-oauth2').Strategy;
var usersData = require('../../../models/users-data-schema');

passport.use(new Strategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: '/api/login/linkedin/callback',
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, function(accessToken, refreshToken, profile, done) {
  var username = 'linkedin/' + profile.id;
  var name = profile.displayName;
  var email;
  var profilePicture;

  if (profile.emails !== undefined) {
    email = profile.emails[0].value;
  } else {
    email = '';
  }

  if (profile._json.pictureUrls.values !== undefined) {
    profilePicture = profile._json.pictureUrls.values[0];
  } else {
    profilePicture = '';
  }
  
  var userData = {
    username: username,
    name: name,
    email: email,
    profilePicture: profilePicture
  }

  usersData.findOne({username: username}, function(err, user) {
    if (!err) {
      if (user !== null) {
        user.update(userData, function(err) {
          if (!err) {
            return done(null, user);
          } else {
            return done(err);
          }
        });
      } else {
        var newUser = new usersData(userData);

        newUser.save(function(err) {
          if (!err) {
            return done(null, newUser);
          } else {
            return done(err);
          }
        });
      }
    } else {
      return done(err);
    }
  });
}));


router.get('/', passport.authenticate('linkedin'));

router.get('/callback', passport.authenticate('linkedin', { 
  failureRedirect: '/' 
}), function(req, res) {
  res.status(200).send({
    success: true, 
    user: 'Login Successful.'
  });
});

module.exports = router;