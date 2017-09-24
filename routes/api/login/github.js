var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-github').Strategy;
var usersData = require('../../../models/users-data-schema');
var popupTools = require('popup-tools');

passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/login/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  var username = 'github/' + profile.id;
  var name = profile.displayName;
  var email;
  var profilePicture;

  if (profile.emails !== undefined) {
    email = profile.emails[0].value;
  } else {
    email = '';
  }

  if (profile.photos !== undefined) {
    profilePicture = profile.photos[0].value;
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


router.get('/', passport.authenticate('github'));

router.get('/callback', passport.authenticate('github'), function(req, res) {
  res.end(popupTools.popupResponse(req.user));
});

module.exports = router;