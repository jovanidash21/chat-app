var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../../models/User');
var ChatRoom = require('../../models/ChatRoom');

router.post('/', (req, res, next) => {
  var userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var chatRoomID = req.body.chatRoomID;
    var blockedUsers = [];

    User.findById(userID, 'blockedUsers')
      .then((user) => {
        blockedUsers = user.blockedUsers;

        return ChatRoom.findById(chatRoomID)
          .populate('members', '-chatRooms -blockedUsers -socketID')
          .lean()
          .exec();
      })
      .then((chatRoom) => {
        for (var i = 0; i < chatRoom.members.length; i++) {
          var member = chatRoom.members[i];

          member.blocked = false;

          if (blockedUsers.includes(member._id)) {
            member.blocked = true;
          }
        }

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
