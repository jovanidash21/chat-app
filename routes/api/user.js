var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../../models/User');
var ChatRoom = require('../../models/ChatRoom');
var Message = require('../../models/Message');

router.get('/', function(req, res, next) {
  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    res.status(200).json(req.user);
  }
});

router.post('/search', function(req, res, next) {
  var query = req.body.query;

  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.find({_id: {$ne: null}, name: {$regex: '\\b' + query, $options: 'i'}})
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  }
});

router.get('/count', function(req, res, next) {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.count({_id: {$ne: null}})
      .then((usersCount) => {
        res.status(200).send({
          success: true,
          count: usersCount
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

router.get('/graph', function(req, res, next) {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.find({_id: {$ne: null}})
      .then((users) => {
        var usersGraphData = [
          {month: "Jan", users: 0},
          {month: "Feb", users: 0},
          {month: "Mar", users: 0},
          {month: "Apr", users: 0},
          {month: "May", users: 0},
          {month: "Jun", users: 0},
          {month: "Jul", users: 0},
          {month: "Aug", users: 0},
          {month: "Sep", users: 0},
          {month: "Oct", users: 0},
          {month: "Nov", users: 0},
          {month: "Dec", users: 0},
        ];
        var todayDate = new Date();
        var todayMonth = todayDate.getMonth();
        var nextMonth = todayMonth !== 11 ? todayMonth + 1 : 0;
        var lastYear = todayDate.getFullYear() - 1;
        var lastTwelveMonthsDate = new Date();
        lastTwelveMonthsDate.setHours(0,0,0,0);
        lastTwelveMonthsDate.setDate(1);
        lastTwelveMonthsDate.setMonth(nextMonth);
        lastTwelveMonthsDate.setYear(lastYear);
        lastTwelveMonthsDate = new Date(lastTwelveMonthsDate);

        for (var i = 0; i < users.length; i++) {
          var user = users[i];
          var userCreatedDate = new Date(user.createdAt);
          var userCreatedDateMonth = usersGraphData[userCreatedDate.getMonth()];

          if (userCreatedDate >= lastTwelveMonthsDate) {
            userCreatedDateMonth["users"] = userCreatedDateMonth["users"] + 1;
          }
        }

        if (todayMonth !== 11) {
          var lastYearMonths = usersGraphData.splice(todayMonth + 1, usersGraphData.length - (todayMonth + 1));

          usersGraphData = lastYearMonths.concat(usersGraphData);
        }

        res.status(200).send(usersGraphData);
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  }
});

router.post('/select', function(req, res, next) {
  var userID = req.body.userID;

  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.findById(userID)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  }
});

router.get('/all', function(req, res, next) {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.find({_id: {$ne: null}})
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  }
});

router.post('/create', function(req, res, next) {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var userData = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      accountType: 'local',
      profilePicture: req.body.profilePicture
    };
    var user = new User(userData);

    User.register(user, req.body.password, function(err) {
      if (!err) {
        var chatLoungeID = process.env.MONGODB_CHAT_LOUNGE_ID;
        var userID = user._id;
        var chatRoomData = {
          name: user.name,
          chatIcon: '',
          members: [userID],
          chatType: 'private'
        };
        var chatRoom = new ChatRoom(chatRoomData);

        chatRoom.save()
          .then((chatRoomData) => {
            var chatRoomID = chatRoom._id;

            if (chatLoungeID) {
              ChatRoom.findByIdAndUpdate(
                chatLoungeID,
                { $push: { members: userID }},
                { safe: true, upsert: true, new: true }
              ).exec();

              User.findByIdAndUpdate(
                userID,
                { $push: { chatRooms: { data: chatLoungeID, unReadMessages: 0 } } },
                { safe: true, upsert: true, new: true }
              ).exec();
            }

            User.findByIdAndUpdate(
              userID,
              { $push: { chatRooms: { data: chatRoomID, unReadMessages: 0 } } },
              { safe: true, upsert: true, new: true }
            ).exec();
          })
          .then(() => {
            res.status(200).send({
              success: true,
              message: 'Login Successful.',
              userData: user
            });
          })
          .catch((error) => {
            res.status(500).send({
              success: false,
              message: 'Server Error!'
            });
          });
      } else {
        res.status(401).send({
          success: false,
          message: 'Username already exist.'
        });
      }
    });
  }
});

router.post('/edit', function(req, res, next) {
  var userID = req.body.userID;

  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var userData = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };

    User.findById(userID)
      .exec()
      .then((user) => {
        if (user.accountType === 'local') {
          userData.profilePicture = req.body.profilePicture
        }

        User.update(
          { _id: userID },
          { $set: userData },
          { safe: true, upsert: true, new: true },
        ).exec();
      })
      .then((user) => {
        res.status(200).send({
          success: true,
          message: 'User Edited'
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

router.post('/delete', function(req, res, next) {
  var userID = req.body.userID;

  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    ChatRoom.find({members: {$in: userID}, chatType: {$in: ["private", "direct"]}})
      .then((chatRooms) => {
        for (var i = 0; i < chatRooms.length; i++) {
          var chatRoom = chatRooms[i];
          var chatRoomID = chatRoom._id;

          for (var j = 0; j < chatRoom.members.length; j++) {
            var memberID = chatRoom.members[j];

            if (memberID != userID) {
              User.findByIdAndUpdate(
                memberID,
                { $pull: {chatRooms: {data: chatRoomID}} },
                { new: true, upsert: true }
              ).exec();
            }
          }

          Message.deleteMany({chatRoom: chatRoomID}).exec();
          ChatRoom.deleteOne({_id: chatRoomID}).exec();
        }

        return ChatRoom.find({members: {$in: userID}, chatType: {$in: ["group", "public"]}});
      })
      .then((chatRooms) => {
        for (var i = 0; i < chatRooms.length; i++) {
          var chatRoom = chatRooms[i];
          var chatRoomID = chatRoom._id;

          Message.deleteMany({user: userID, chatRoom: chatRoomID}).exec();
          Message.update(
            { user: {$ne: userID}, chatRoom: chatRoomID },
            { $pull: {readBy: userID} },
            { safe: true }
          ).exec();
          ChatRoom.findByIdAndUpdate(
            chatRoomID,
            { $pull: {members: userID} },
            { new: true, upsert: true }
          ).exec();
        }

        User.deleteOne({_id: userID}).exec();

        res.status(200).send({
          success: true,
          message: 'User Deleted'
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
