const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../../models/User');

router.post('/', (req, res, next) => {
  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const userID = req.body.userID;

    User.findById(userID)
      .populate('blockedUsers', '-chatRooms -blockedUsers -socketID')
      .lean()
      .exec()
      .then((user) => {
        for (let i = 0; i < user.blockedUsers.length; i += 1) {
          user.blockedUsers[i].blocked = true;
        }

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
  const userID = req.body.userID;

  if (req.user === undefined || req.user._id != userID) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const blockUserID = req.body.blockUserID;

    User.findById(blockUserID)
      .then((user) => {
        if (user.role === 'admin') {
          res.status(401).send({
            success: false,
            message: 'Unauthorized'
          });
        } else {
          User.findByIdAndUpdate(
            userID,
            { $addToSet: { blockedUsers: blockUserID }},
            { safe: true, upsert: true, new: true, select: '-chatRooms -blockedUsers -socketID' }
          ).exec();

          res.status(200).send({
            success: true,
            message: 'User Blocked'
          });
        }
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
  const userID = req.body.userID;

  if (req.user === undefined || req.user._id != userID) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const unblockUserID = req.body.unblockUserID;

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

router.post('/unblock-all', (req, res, next) => {
  const userID = req.body.userID;

  if (req.user === undefined || req.user._id != userID) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.findByIdAndUpdate(
      userID,
      { $set: { blockedUsers: [] }},
      { new: true, upsert: true, select: '-chatRooms -blockedUsers -socketID' }
    )
    .then((user) => {
      res.status(200).send({
        success: true,
        message: 'All Users Unblocked'
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
