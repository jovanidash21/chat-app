var express = require('express');
var router = express.Router({mergeParams: true});
var usersData = require('../../models/users-data-schema');
var chatRoomsData = require('../../models/chat-rooms-data-schema');

router.get('/:userID', function(req, res, next) {
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    usersData.findById(userID, 'chatRooms')
      .populate({
        path: 'chatRooms',
        populate: {
          path: 'members'
        }
      }).exec(function(err, userChatRooms) {
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
      var chatRoom = new chatRoomsData(chatRoomData);

      chatRoom.save(function(err, chatRoomData) {
        if (!err) {
          var chatRoomID = chatRoom._id;

          chatRoomsData.findById(chatRoomID)
            .populate('members')
            .exec(function(err, chatRoomData) {
              if (!err) {
                chatRoomData.members.forEach(function (chatRoomMember) {
                  usersData.findByIdAndUpdate(
                    chatRoomMember,
                    { $push: { chatRooms: chatRoomID }},
                    { safe: true, upsert: true, new: true },
                    function(err) {
                      if (!err) {
                        res.end();
                      } else {
                        res.end(err);
                      }
                    }
                  );
                });
                res.status(200).send({
                  success: true,
                  message: 'Chat Room Created.',
                  chatRoomData: chatRoomData
                });
              } else {
                res.status(500).send({
                  success: false,
                  message: 'Server Error!'
                });
              }
            });
        } else {
          res.status(500).send({
            success: false,
            message: 'Server Error!'
          });
        }
      });
    }
  }
});

module.exports = router;

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

    chatRoomsData.findOne({members: members, chatType: 'direct'}, function(err, chatRoom) {
      if (!err) {
        if (chatRoom !== null) {
          res.status(401).send({
            success: false,
            message: 'Chat room already exist.'
          });
        } else {
          chatRoomsData.findOne({members: members.reverse(), chatType: 'direct'}, function(err, chatRoom) {
            if (!err) {
              if (chatRoom !== null) {
                res.status(401).send({
                  success: false,
                  message: 'Chat room already exist.'
                });
              } else {
                var chatRoom = new chatRoomsData(chatRoomData);

                chatRoom.save(function(err, chatRoomData) {
                  if (!err) {
                    var chatRoomID = chatRoom._id;

                    chatRoomsData.findById(chatRoomID)
                      .populate('members')
                      .exec(function(err, chatRoomData) {
                        if (!err) {
                          chatRoomData.members.forEach(function (chatRoomMember) {
                            usersData.findByIdAndUpdate(
                              chatRoomMember,
                              { $push: { chatRooms: chatRoomID }},
                              { safe: true, upsert: true, new: true },
                              function(err) {
                                if (!err) {
                                  res.end();
                                } else {
                                  res.end(err);
                                }
                              }
                            );
                          });
                          res.status(200).send({
                            success: true,
                            message: 'Chat Room Created.',
                            chatRoomData: chatRoomData
                          });
                        } else {
                          res.status(500).send({
                            success: false,
                            message: 'Server Error!'
                          });
                        }
                      });
                  } else {
                    res.status(500).send({
                      success: false,
                      message: 'Server Error!'
                    });
                  }
                });
              }
            } else {
              res.end(err);
            }
          });
        }
      } else {
        res.end(err);
      }
    });
  }
});

module.exports = router;
