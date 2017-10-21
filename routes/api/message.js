var express = require('express');
var router = express.Router({mergeParams: true});
var messagesData = require('../../models/messages-data-schema');

router.post('/:chatRoomID/:userID', function(req, res, next) {
  var chatRoomID = req.params.chatRoomID;
  var userID = req.params.userID;

  if ((req.user === undefined) || (req.user._id !== userID)) {
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

    message.save(function(err) {
      if (!err) {
        res.status(200).send({
          success: true, 
          message: 'Message Sent.'
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