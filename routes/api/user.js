var express = require('express');
var router = express.Router({mergeParams: true});
var usersData = require('../../models/users-data-schema');

router.get('/', function(req, res, next) {
  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    res.status(200).json(req.user);
  }
});

router.get('/all', function(req, res, next) {
  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    usersData.find({}, function(err, users) {
      if (!err) {
        res.status(200).send(users);
      } else {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      }
    });
  }
});

module.exports = router;
