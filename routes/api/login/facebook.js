var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var usersData = require('../../../models/users-data-schema');

passport.use(new Strategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/api/login/facebook/callback',
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

router.get('/', passport.authenticate('facebook', {
  scope : ['email'] 
}));

router.get('/callback', passport.authenticate('facebook', { 
  failureRedirect: '/' 
}), function(req, res) {
  res.status(200).send({
    success: true, 
    user: 'Login Successful.'
  });
});

module.exports = router;