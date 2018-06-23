var express = require('express');
var router = express.Router({mergeParams: true});
var Message = require('../../models/Message');
var ChatRoom = require('../../models/ChatRoom');
var User = require('../../models/User');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

var fileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

var imageFilter = (req, file, cb) => {
  if ( file.mimetype.indexOf('image/') > -1 ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var imageUpload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

var audioFilter = (req, file, cb) => {
  if ( file.mimetype === 'audio/webm' ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var audioUpload = multer({
  storage: storage,
  fileFilter: audioFilter,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

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

            Message.findOneAndUpdate(
              { _id: message._id, readBy: { $ne: userID } },
              { $addToSet: { readBy: userID } },
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

          User.update(
            { _id: userID, 'chatRooms.data': chatRoomID },
            { $set: { 'chatRooms.$.unReadMessages': 0 } },
            { safe: true, upsert: true, new: true },
            function(err) {
              if (!err) {
                res.end();
              } else {
                res.end(err);
              }
            }
          );

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

router.post('/text', function(req, res, next) {
  var chatRoomID = req.body.chatRoomID;
  var userID = req.body.userID;

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
      readBy: [userID],
      messageType: 'text'
    };
    var message = new Message(messageData);

    message.save(function(err, messageData) {
      if (!err) {
        Message.findById(messageData._id)
          .populate('user')
          .exec(function(err, messageData) {
            if (!err) {
              ChatRoom.findById(chatRoomID)
                .exec(function(err, chatRoom) {
                  if (!err) {
                    for (var i = 0; i < chatRoom.members.length; i++) {
                      var memberID = chatRoom.members[i];

                      if (memberID != userID) {
                        User.update(
                          { _id: memberID, 'chatRooms.data': chatRoomID },
                          { $inc: { 'chatRooms.$.unReadMessages': 1 } },
                          { safe: true, upsert: true, new: true },
                          function(err) {
                            if (!err) {
                              res.end();
                            } else {
                              res.end(err);
                            }
                          }
                        );
                      } else {
                        continue;
                      }
                    }
                  } else {
                    res.status(500).send({
                      success: false,
                      message: 'Server Error!'
                    });
                  }
                });

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

router.post('/file', fileUpload.single('file'), function(req, res, next) {
  var chatRoomID = req.body.chatRoomID;
  var userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var messageType = 'file';

    if ( req.file.mimetype.indexOf('image/') > -1 ) {

      messageType = 'image';
    }

    var messageData = {
      text: req.file.originalname,
      user: userID,
      chatRoom: chatRoomID,
      readBy: [userID],
      messageType: messageType,
      fileLink: req.file.path
    };
    var message = new Message(messageData);

    message.save(function(err, messageData) {
      if (!err) {
        Message.findById(messageData._id)
          .populate('user')
          .exec(function(err, messageData) {
            if (!err) {
              ChatRoom.findById(chatRoomID)
                .exec(function(err, chatRoom) {
                  if (!err) {
                    for (var i = 0; i < chatRoom.members.length; i++) {
                      var memberID = chatRoom.members[i];

                      if (memberID != userID) {
                        User.update(
                          { _id: memberID, 'chatRooms.data': chatRoomID },
                          { $inc: { 'chatRooms.$.unReadMessages': 1 } },
                          { safe: true, upsert: true, new: true },
                          function(err) {
                            if (!err) {
                              res.end();
                            } else {
                              res.end(err);
                            }
                          }
                        );
                      } else {
                        continue;
                      }
                    }
                  } else {
                    res.status(500).send({
                      success: false,
                      message: 'Server Error!'
                    });
                  }
                });

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

router.post('/image', imageUpload.single('image'), function(req, res, next) {
  var chatRoomID = req.body.chatRoomID;
  var userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var messageData = {
      text: req.file.originalname,
      user: userID,
      chatRoom: chatRoomID,
      readBy: [userID],
      messageType: 'image',
      fileLink: req.file.path
    };
    var message = new Message(messageData);

    message.save(function(err, messageData) {
      if (!err) {
        Message.findById(messageData._id)
          .populate('user')
          .exec(function(err, messageData) {
            if (!err) {
              ChatRoom.findById(chatRoomID)
                .exec(function(err, chatRoom) {
                  if (!err) {
                    for (var i = 0; i < chatRoom.members.length; i++) {
                      var memberID = chatRoom.members[i];

                      if (memberID != userID) {
                        User.update(
                          { _id: memberID, 'chatRooms.data': chatRoomID },
                          { $inc: { 'chatRooms.$.unReadMessages': 1 } },
                          { safe: true, upsert: true, new: true },
                          function(err) {
                            if (!err) {
                              res.end();
                            } else {
                              res.end(err);
                            }
                          }
                        );
                      } else {
                        continue;
                      }
                    }
                  } else {
                    res.status(500).send({
                      success: false,
                      message: 'Server Error!'
                    });
                  }
                });

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

router.post('/audio', audioUpload.single('audio'), function(req, res, next) {
  var chatRoomID = req.body.chatRoomID;
  var userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var messageData = {
      text: req.file.originalname,
      user: userID,
      chatRoom: chatRoomID,
      readBy: [userID],
      messageType: 'audio',
      fileLink: req.file.path
    };
    var message = new Message(messageData);

    message.save(function(err, messageData) {
      if (!err) {
        Message.findById(messageData._id)
          .populate('user')
          .exec(function(err, messageData) {
            if (!err) {
              ChatRoom.findById(chatRoomID)
                .exec(function(err, chatRoom) {
                  if (!err) {
                    for (var i = 0; i < chatRoom.members.length; i++) {
                      var memberID = chatRoom.members[i];

                      if (memberID != userID) {
                        User.update(
                          { _id: memberID, 'chatRooms.data': chatRoomID },
                          { $inc: { 'chatRooms.$.unReadMessages': 1 } },
                          { safe: true, upsert: true, new: true },
                          function(err) {
                            if (!err) {
                              res.end();
                            } else {
                              res.end(err);
                            }
                          }
                        );
                      } else {
                        continue;
                      }
                    }
                  } else {
                    res.status(500).send({
                      success: false,
                      message: 'Server Error!'
                    });
                  }
                });

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
