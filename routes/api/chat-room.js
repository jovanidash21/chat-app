var express = require('express');
var router = express.Router({mergeParams: true});
var usersData = require('../../models/users-data-schema');
var chatRoomsData = require('../../models/chat-rooms-data-schema');

router.get('/:userID', function(req, res, next) {
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id !== userID)) {
    res.status(401).send({
      success: false, 
      message: 'Unauthorized'
    });
  } else {
    usersData.findById(userID, 'chatRooms')
      .populate('chatRooms')
      .exec(function(err, userChatRooms) {
        if (!err) {
          res.status(200).send(userChatRooms);
        } else {
          res.status(500).send({
            success: false, 
            message: 'Server Error!'
          });
        }
      });
  }
});

router.post('/:userID', function(req, res, next) {
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id !== userID)) {
    res.status(401).send({
      success: false, 
      message: 'Unauthorized'
    });
  } else {
    var chatRoomData = {
      name: req.body.name,
      private: req.body.private,
      members: [userID]
    };
    var chatRoom = new chatRoomsData(chatRoomData);

    chatRoom.save(function(err) {
      if (!err) {
        var chatRoomID = chatRoom._id;

        usersData.findByIdAndUpdate(
            userID,
            { $push: { chatRooms: chatRoomID }},
            { safe: true, upsert: true, new: true },
            function(err, results) {
              if (!err) {
                res.status(200).send({
                  success: true, 
                  message: 'Chat Room Created.'
                });
              } else {
                res.status(500).send({
                  success: false, 
                  message: 'Server Error!'
                });
              }
            }
          );
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