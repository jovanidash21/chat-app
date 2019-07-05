const express = require('express');
const router = express.Router({mergeParams: true});
const Message = require('../../models/Message');
const ChatRoom = require('../../models/ChatRoom');
const User = require('../../models/User');
const multer = require('multer');
const slash = require('slash');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/file/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/audio/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname + '.webm');
  }
});

const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

const audioFilter = (req, file, cb) => {
  if ( file.mimetype === 'audio/webm' ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const audioUpload = multer({
  storage: audioStorage,
  fileFilter: audioFilter,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

router.post('/', (req, res, next) => {
  const userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const chatRoomID = req.body.chatRoomID;
    const skipCount = req.body.skipCount;
    let blockedUsers = [];

    User.find({'chatRooms.data': chatRoomID, blockedUsers: {$eq: userID}})
      .distinct('_id')
      .then((userIDs) => {
        blockedUsers = userIDs;

        return User.findById(userID, 'blockedUsers');
      })
      .then((user) => {
        return Message.find({
          $and: [
            { user: { $nin: user.blockedUsers } },
            { user: { $nin: blockedUsers } }
          ], chatRoom: chatRoomID})
          .sort({createdAt: 'descending'})
          .skip(skipCount)
          .limit(50)
          .populate('user', '-chatRooms -blockedUsers -socketID')
          .exec();
      })
      .then((messages) => {
        const chatRoomMessages = messages.reverse();

        User.updateOne(
          { _id: userID, 'chatRooms.data': chatRoomID },
          { $set: { 'chatRooms.$.unReadMessages': 0 } },
          { safe: true, upsert: true, new: true }
        ).exec();

        res.status(200).send({
          success: true,
          message: 'Messages Fetched',
          messages: chatRoomMessages
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

router.post('/text', (req, res, next) => {
  const userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const chatRoomID = req.body.chatRoomID;
    const messageData = {
      text: req.body.text,
      user: userID,
      chatRoom: chatRoomID,
      messageType: 'text'
    };
    const message = new Message(messageData);

    message.save()
      .then((messageData) => {
        return ChatRoom.findByIdAndUpdate(chatRoomID,
          { $set: { latestMessageDate: messageData.createdAt } },
          { safe: true, upsert: true, new: true }
        ).exec();
      })
      .then((chatRoom) => {
        for (let i = 0; i < chatRoom.members.length; i += 1) {
          const memberID = chatRoom.members[i];

          if (memberID != userID) {
            User.updateOne(
              { _id: memberID, 'chatRooms.data': chatRoomID },
              { $inc: { 'chatRooms.$.unReadMessages': 1 } },
              { safe: true, upsert: true, new: true }
            ).exec();
          } else {
            continue;
          }
        }

        return Message.findById(message._id)
          .populate('user', '-chatRooms -blockedUsers -socketID');
      })
      .then((messageData) => {
        res.status(200).send({
          success: true,
          message: 'Message Sent',
          messageData: messageData
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

router.post('/file', fileUpload.single('file'), (req, res, next) => {
  const userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const chatRoomID = req.body.chatRoomID;
    let messageType = 'file';
    const fileLink = slash(req.protocol + '://' + req.get('host') + '/' + req.file.path);

    if ( req.file.mimetype.indexOf('image/') > -1 ) {
      messageType = 'image';
    }

    const messageData = {
      text: req.file.originalname,
      user: userID,
      chatRoom: chatRoomID,
      messageType: messageType,
      fileLink: fileLink
    };
    const message = new Message(messageData);

    message.save()
      .then((messageData) => {
        return ChatRoom.findByIdAndUpdate(chatRoomID,
          { $set: { latestMessageDate: messageData.createdAt } },
          { safe: true, upsert: true, new: true }
        ).exec();
      })
      .then((chatRoom) => {
        for (let i = 0; i < chatRoom.members.length; i += 1) {
          const memberID = chatRoom.members[i];

          if (memberID != userID) {
            User.updateOne(
              { _id: memberID, 'chatRooms.data': chatRoomID },
              { $inc: { 'chatRooms.$.unReadMessages': 1 } },
              { safe: true, upsert: true, new: true }
            ).exec();
          } else {
            continue;
          }
        }

        return Message.findById(message._id)
          .populate('user', '-chatRooms -blockedUsers -socketID');
      })
      .then((messageData) => {
        res.status(200).send({
          success: true,
          message: 'Message Sent',
          messageData: messageData
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

router.post('/audio', audioUpload.single('audio'), (req, res, next) => {
  const chatRoomID = req.body.chatRoomID;
  const userID = req.body.userID;

  if ((req.user === undefined) || (req.user._id != userID)) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const fileLink = slash(req.protocol + '://' + req.get('host') + '/' + req.file.path);
    const messageData = {
      text: req.file.originalname,
      user: userID,
      chatRoom: chatRoomID,
      messageType: 'audio',
      fileLink: fileLink
    };
    const message = new Message(messageData);

    message.save()
      .then((messageData) => {
        return ChatRoom.findByIdAndUpdate(chatRoomID,
          { $set: { latestMessageDate: messageData.createdAt } },
          { safe: true, upsert: true, new: true }
        ).exec();
      })
      .then((chatRoom) => {
        for (let i = 0; i < chatRoom.members.length; i += 1) {
          const memberID = chatRoom.members[i];

          if (memberID != userID) {
            User.updateOne(
              { _id: memberID, 'chatRooms.data': chatRoomID },
              { $inc: { 'chatRooms.$.unReadMessages': 1 } },
              { safe: true, upsert: true, new: true }
            ).exec();
          } else {
            continue;
          }
        }

        return Message.findById(message._id)
          .populate('user', '-chatRooms -blockedUsers -socketID');
      })
      .then((messageData) => {
        res.status(200).send({
          success: true,
          message: 'Message Sent',
          messageData: messageData
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

router.get('/count', (req, res, next) => {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    Message.countDocuments({_id: {$ne: null}})
      .then((messagesCount) => {
        res.status(200).send({
          success: true,
          message: 'Messages Count Fetched',
          count: messagesCount
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

router.post('/delete', (req, res, next) => {
  const messageID = req.body.messageID;
  const chatRoomID = req.body.chatRoomID;

  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    Message.deleteOne({_id: messageID, chatRoom: chatRoomID})
      .exec()
      .then(() => {
        res.status(200).send({
          success: true,
          message: 'Message Deleted'
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
