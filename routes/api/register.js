var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var usersData = require('../../models/users-data-schema');

router.post('/', function(req, res, next) {
  var userData = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email
  };

  usersData.register(new usersData(userData), req.body.password, function(err) {
    if (!err) {
      passport.authenticate('local', function(err, user) {
        req.logIn(user, function(err) {
          if (!err ) {
            res.status(200).send({
              success: true, 
              message: 'Login Successful.'
            });
          } else {
             res.status(500).send({
              success: false, 
              message: 'Server Error!'
            });
          }
        })
      })(req, res, next);
    } else {
      res.status(401).send({
        success: false, 
        message: 'Username already exist.'
      });
    }
  });
});

module.exports = router;