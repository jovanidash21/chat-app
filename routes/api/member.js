var express = require('express');
var router = express.Router({mergeParams: true});
var ChatRoom = require('../../models/ChatRoom');

router.get('/:chatRoomID/:userID', function(req, res, next) {
  var chatRoomID = req.params.chatRoomID;
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    ChatRoom.findById(chatRoomID)
      .populate('members')
      .exec(function(err, chatRoomData) {
        if (!err) {
          res.status(200).send(chatRoomData.members);
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
