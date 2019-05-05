var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../../models/User');

router.post('/', (req, res, next) => {
  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var userID = req.body.userID;

    User.findById(userID)
      .populate('blockedUsers', '-chatRooms -blockedUsers -socketID')
      .exec()
      .then((user) => {
        res.status(200).send({
          success: true,
          message: 'Blocked Users Fetched',
          blockedUsers: user.blockedUsers
        });
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  }
});

module.exports = router;
