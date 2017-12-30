var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-instagram').Strategy;
var usersData = require('../../../models/users-data-schema');
var popupTools = require('popup-tools');

passport.use(new Strategy({
  clientID: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  callbackURL: '/api/login/instagram/callback'
}, function(accessToken, refreshToken, profile, done) {
  var username = 'instagram/' + profile.id;
  var name = profile.displayName;
  var profilePicture = profile._json.data.profile_picture.replace('s150x150', 's200x200');
  var userData = {
    username: username,
    name: name,
    email: '',
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

router.get('/', passport.authenticate('instagram'));

router.get('/callback', passport.authenticate('instagram'), function(req, res) {
  res.send(popupTools.popupResponse({userData: req.user}));
});

module.exports = router;
