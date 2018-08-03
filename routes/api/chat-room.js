var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../../models/User');
var ChatRoom = require('../../models/ChatRoom');
var Message = require('../../models/Message');

router.get('/:userID', function(req, res, next) {
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.findById(userID, 'chatRooms')
      .populate({
        path: 'chatRooms.data',
        populate: {
          path: 'members'
        }
      })
      .exec()
      .then((user) => {
        var userChatRooms = user.chatRooms;

        for (var i = 0; i < userChatRooms.length; i++) {
          var chatRoom = userChatRooms[i].data;

          for (var j = 0; j < chatRoom.members.length; j++) {
            var member = chatRoom.members[j];

            if (chatRoom.chatType === 'private') {
              if (member._id == userID) {
                chatRoom.chatIcon = member.profilePicture;
              }
            } else if (chatRoom.chatType === 'direct') {
              if (member._id != userID) {
                chatRoom.name = member.name;
                chatRoom.chatIcon = member.profilePicture;
              }
            } else if ((chatRoom.chatType === 'group') || chatRoom.chatType === 'public') {
              chatRoom.members[j] = member._id;
            }
          }
        }
        res.status(200).send(userChatRooms);
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  }
});

router.post('/group/:userID', function(req, res, next) {
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var name = req.body.name;
    var members = req.body.members;
    var chatType = 'group';
    var chatRoomData = {
      name: name,
      members: members,
      chatType: chatType
    };

    if (members.length < 3) {
      res.status(401).send({
        success: false,
        message: 'Please select at least 3 members.'
      });
    } else {
      var chatRoom = new ChatRoom(chatRoomData);

      chatRoom.save()
        .then((chatRoomData) => {
          for (var i = 0; i < chatRoomData.members.length; i++) {
            var chatRoomMember = chatRoomData.members[i];

            User.findByIdAndUpdate(
              chatRoomMember,
              { $push: { chatRooms: { data: chatRoomData._id, unReadMessages: 0 } } },
              { safe: true, upsert: true, new: true }
            ).exec();
          }

          return ChatRoom.findById(chatRoomData._id)
            .populate('members');
        })
        .then((chatRoomData) => {
          res.status(200).send({
            success: true,
            message: 'Chat Room Created.',
            chatRoom: {
              data: chatRoomData,
              unReadMessages: 0
            }
          });
        })
        .catch((error) => {
          res.status(500).send({
            success: false,
            message: 'Server Error!'
          });
        });
    }
  }
});

router.post('/direct/:userID', function(req, res, next) {
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var name = req.body.name;
    var members = req.body.members;
    var chatType = 'direct';
    var chatRoomData = {
      name: name,
      members: members,
      chatType: chatType
    };

    ChatRoom.findOne({members: {"$all": members}, chatType: 'direct'}, function(err, chatRoom) {
      if (!err) {
        if (chatRoom !== null) {
          res.status(401).send({
            success: false,
            message: 'Chat room already exist.'
          });
        } else {
          var chatRoom = new ChatRoom(chatRoomData);

          chatRoom.save()
            .then((chatRoomData) => {
              for (var i = 0; i < chatRoomData.members.length; i++) {
                var chatRoomMember = chatRoomData.members[i];

                User.findByIdAndUpdate(
                  chatRoomMember,
                  { $push: { chatRooms: { data: chatRoomData._id, unReadMessages: 0 } } },
                  { safe: true, upsert: true, new: true }
                ).exec();
              }

              return ChatRoom.findById(chatRoomData._id)
                .populate('members');
            })
            .then((chatRoomData) => {
              res.status(200).send({
                success: true,
                message: 'Chat Room Created.',
                chatRoom: {
                  data: chatRoomData,
                  unReadMessages: 0
                }
              });
            })
            .catch((error) => {
              res.status(500).send({
                success: false,
                message: 'Server Error!'
              });
            });
        }
      } else {
        res.end(err);
      }
    });
  }
});

module.exports = router;
