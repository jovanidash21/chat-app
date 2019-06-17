const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../../models/User');
const ChatRoom = require('../../models/ChatRoom');

router.post('/', (req, res, next) => {
  const userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const chatRoomID = req.body.chatRoomID;
    let blockedUsers = [];

    User.findById(userID, 'blockedUsers')
      .then((user) => {
        blockedUsers = user.blockedUsers;

        return ChatRoom.findById(chatRoomID)
          .populate('members', '-chatRooms -blockedUsers -socketID')
          .lean()
          .exec();
      })
      .then((chatRoom) => {
        for (let i = 0; i < chatRoom.members.length; i += 1) {
          const member = chatRoom.members[i];
          let blocked = false;

          if (blockedUsers.indexOf(member._id) > -1) {
            blocked = true;
          }

          member.blocked = blocked;
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
