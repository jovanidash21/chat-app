const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../../../models/User');

passport.use(new Strategy(
  User.authenticate()
));

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (!err) {
      if (!user) {
        res.status(401).send({
          success: false,
          message: 'Invalid username or password'
        });
      } else {
        req.logIn(user, (err) => {
          if (!err) {
            res.status(200).send({
              success: true,
              message: 'Login Successful',
              userData: user
            });
          } else {
            res.status(402).send({
              success: false,
              message: 'Error! Please try again'
            });
          }
        })
      }
    } else {
      res.status(500).send({
        success: false,
        message: 'Server Error!'
      });
    }
  })(req, res, next);
});

module.exports = router;
