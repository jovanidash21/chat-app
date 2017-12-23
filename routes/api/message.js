var express = require('express');
var router = express.Router({mergeParams: true});
var messagesData = require('../../models/messages-data-schema');

router.get('/:chatRoomID/:userID', function(req, res, next) {
  var chatRoomID = req.params.chatRoomID;
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    messagesData.find({chatRoom: chatRoomID})
      .populate('user')
      .exec(function(err, chatRoomMessages) {
        if (!err) {
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
      chatRoom: chatRoomID
    };
    var message = new messagesData(messageData);

    message.save(function(err, messageData) {
      if (!err) {
        messagesData.findById(messageData._id)
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
