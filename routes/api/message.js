var express = require('express');
var router = express.Router({mergeParams: true});
var Message = require('../../models/Message');

router.get('/:chatRoomID/:userID', function(req, res, next) {
  var chatRoomID = req.params.chatRoomID;
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    Message.find({chatRoom: chatRoomID})
      .populate('user')
      .sort('createdAt')
      .exec(function(err, chatRoomMessages) {
        if (!err) {
          for (var i = 0; i < chatRoomMessages.length; i++) {
            var message = chatRoomMessages[i];

            if (message.readBy.indexOf(userID) === -1) {
              Message.findByIdAndUpdate(
                message._id,
                { $push: { readBy: userID }},
                { safe: true, upsert: true, new: true },
                function(err) {
                  if (!err) {
                    res.end();
                  } else {
                    res.end(err);
                  }
                }
              );
            }
          }
          res.status(200).send(chatRoomMessages);
        } else {
          res.status(500).send({
            success: false,
            message: 'Server Error!'
          });
        }
      });
  }
});

router.post('/:chatRoomID/:userID', function(req, res, next) {
  var chatRoomID = req.params.chatRoomID;
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var messageData = {
      text: req.body.text,
      user: userID,
      chatRoom: chatRoomID,
      readBy: [userID]
    };
    var message = new Message(messageData);

    message.save(function(err, messageData) {
      if (!err) {
        Message.findById(messageData._id)
          .populate('user')
          .exec(function(err, messageData) {
            if (!err) {
              res.status(200).send({
                success: true,
                message: 'Message Sent.',
                messageData: messageData
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
});

module.exports = router;
