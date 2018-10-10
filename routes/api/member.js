var express = require('express');
var router = express.Router({mergeParams: true});
var ChatRoom = require('../../models/ChatRoom');

router.post('/', function(req, res, next) {
  var userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var chatRoomID = req.body.chatRoomID;

    ChatRoom.findById(chatRoomID)
      .populate('members')
      .exec()
      .then((chatRoom) => {
        res.status(200).send({
          success: true,
          message: 'Members Fetched',
          members: chatRoom.members
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
