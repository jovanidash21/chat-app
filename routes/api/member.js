var express = require('express');
var router = express.Router({mergeParams: true});
var ChatRoom = require('../../models/ChatRoom');

router.post('/', function(req, res, next) {
  var chatRoomID = req.body.chatRoomID;
  var userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    ChatRoom.findById(chatRoomID)
      .populate('members')
      .exec()
      .then((chatRoom) => {
        res.status(200).send(chatRoom.members);
      }).catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  }
});

module.exports = router;
