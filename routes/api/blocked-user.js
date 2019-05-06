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

router.post('/block', (req, res, next) => {
  var userID = req.body.userID;

  if (req.user === undefined || req.user._id != userID) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var blockUserID = req.body.blockUserID;

    User.findByIdAndUpdate(
      userID,
      { $addToSet: { blockedUsers: blockUserID }},
      { safe: true, upsert: true, new: true, select: '-chatRooms -blockedUsers -socketID' }
    )
    .then((user) => {
      res.status(200).send({
        success: true,
        message: 'User Blocked'
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

router.post('/unblock', (req, res, next) => {
  var userID = req.body.userID;

  if (req.user === undefined || req.user._id != userID) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var unblockUserID = req.body.unblockUserID;

    User.findByIdAndUpdate(
      userID,
      { $pull: { blockedUsers: unblockUserID }},
      { new: true, upsert: true, select: '-chatRooms -blockedUsers -socketID' }
    )
    .then((user) => {
      res.status(200).send({
        success: true,
        message: 'User Unblocked'
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
