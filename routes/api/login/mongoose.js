var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var usersData = require('../../../models/users-data-schema');

passport.use(new Strategy(
  usersData.authenticate()
));

passport.serializeUser(
  usersData.serializeUser()
);

passport.deserializeUser(
  usersData.deserializeUser()
);

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if ( !err ) {
      if ( !user ) {
        res.status(401).send({
          success: false, 
          message: 'Login failed! Invalid username or password.'
        });
      }
      else {
        req.logIn(user, function(err) {
          if ( !err ) {
            res.json({
              success: true, 
              message: 'Login Successful.'
            })
          }
          else {
            res.status(402).send({
              success: false, 
              message: 'Error! Please try again.'
            });
          }
        })
      }
    }
    else {
      res.status(402).send({
        success: false, 
        message: 'Error! Please try again.'
      });
    }
  })(req, res, next);
});

module.exports = router;