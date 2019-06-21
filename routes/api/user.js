const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../../models/User');
const ChatRoom = require('../../models/ChatRoom');
const Message = require('../../models/Message');

router.get('/', (req, res, next) => {
  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const user = req.user.toObject();

    delete user['chatRooms'];
    delete user['blockedUsers'];
    delete user['socketID'];

    res.status(200).send({
      success: true,
      message: 'User Fetched',
      user: user
    });
  }
});

router.post('/search', (req, res, next) => {
  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const query = req.body.query;
    const userQuery = {
      _id: { $ne: null },
      $or: [
        { username: { $regex: '\\b' + query, $options: 'i' } },
        { name: { $regex: '\\b' + query, $options: 'i' } }
      ]
    };

    if (req.body.chatRoomID && req.body.chatRoomID.length > 0) {
      userQuery['chatRooms.data'] = req.body.chatRoomID;
    }

    User.find(userQuery, '-chatRooms -blockedUsers -socketID')
      .then((users) => {
        res.status(200).send({
          success: true,
          message: 'Users Fetched',
          users: users
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
    User.countDocuments({_id: {$ne: null}})
      .then((usersCount) => {
        res.status(200).send({
          success: true,
          message: 'Users Count Fetched',
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

router.get('/graph', (req, res, next) => {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.find({_id: {$ne: null}})
      .then((users) => {
        let usersGraphData = [
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
        const todayDate = new Date();
        const todayMonth = todayDate.getMonth();
        const nextMonth = todayMonth !== 11 ? todayMonth + 1 : 0;
        const lastYear = todayDate.getFullYear() - 1;
        let lastTwelveMonthsDate = new Date();
        lastTwelveMonthsDate.setHours(0,0,0,0);
        lastTwelveMonthsDate.setDate(1);
        lastTwelveMonthsDate.setMonth(nextMonth);
        lastTwelveMonthsDate.setYear(lastYear);
        lastTwelveMonthsDate = new Date(lastTwelveMonthsDate);

        for (let i = 0; i < users.length; i += 1) {
          const user = users[i];
          const userCreatedDate = new Date(user.createdAt);
          const userCreatedDateMonth = usersGraphData[userCreatedDate.getMonth()];

          if (userCreatedDate >= lastTwelveMonthsDate) {
            userCreatedDateMonth["users"] = userCreatedDateMonth["users"] + 1;
          }
        }

        if (todayMonth !== 11) {
          const lastYearMonths = usersGraphData.splice(todayMonth + 1, usersGraphData.length - (todayMonth + 1));

          usersGraphData = lastYearMonths.concat(usersGraphData);
        }
        res.status(200).send({
          success: true,
          message: 'Users Graph Fetched',
          graph: usersGraphData
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

router.post('/select', (req, res, next) => {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const userID = req.body.userID;

    User.findById(userID, '-chatRooms -blockedUsers -socketID')
      .then((user) => {
        res.status(200).send({
          success: true,
          message: 'User Selected',
          user: user
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

router.get('/all', (req, res, next) => {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    User.find({_id: {$ne: null}}, '-chatRooms -blockedUsers -socketID')
      .then((users) => {
        res.status(200).send({
          success: true,
          message: 'Users Fetched',
          users: users
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

router.post('/create', (req, res, next) => {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const userData = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      accountType: 'local',
      profilePicture: req.body.profilePicture
    };
    const user = new User(userData);

    User.register(user, req.body.password, (err) => {
      if (!err) {
        const chatLoungeID = process.env.MONGODB_CHAT_LOUNGE_ID;
        const userID = user._id;
        const chatRoomData = {
          name: user.name,
          chatIcon: '',
          members: [userID],
          chatType: 'private'
        };
        const chatRoom = new ChatRoom(chatRoomData);

        chatRoom.save()
          .then((chatRoomData) => {
            const chatRoomID = chatRoom._id;

            if (chatLoungeID) {
              ChatRoom.findByIdAndUpdate(
                chatLoungeID,
                { $push: { members: userID }},
                { safe: true, upsert: true, new: true }
              ).exec();

              User.findByIdAndUpdate(
                userID,
                { $push: { chatRooms: { data: chatLoungeID, mute: {} } } },
                { safe: true, upsert: true, new: true }
              ).exec();
            }

            return User.findByIdAndUpdate(
              userID,
              { $push: { chatRooms: { data: chatRoomID, mute: {} } } },
              { safe: true, upsert: true, new: true, select: '-chatRooms -blockedUsers -socketID' }
            ).exec();
          })
          .then((user) => {
            res.status(200).send({
              success: true,
              message: 'User Created',
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
          message: 'Username already exist'
        });
      }
    });
  }
});

router.post('/edit', (req, res, next) => {
  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const userID = req.body.userID;
    const username = req.body.username;
    const userData = {
      username: username,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };

    User.findOne({username: username})
      .then((user) => {
        if (user != null && user._id != userID) {
          res.status(401).send({
            success: false,
            message: 'Username already exist'
          });
        } else {
          User.findById(userID)
            .then((user) => {
              if (user.accountType === 'local') {
                userData.profilePicture = req.body.profilePicture
              }

              User.updateOne(
                { _id: userID },
                { $set: userData },
                { safe: true, upsert: true, new: true },
              ).exec();

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
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  }
});

router.post('/edit-profile', (req, res, next) => {
  const userID = req.body.userID;

  if (
    req.user === undefined ||
    req.user._id != userID ||
    req.user.accountType !== 'local'
  ) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    const username = req.body.username;
    const userData = {
      username: username,
      name: req.body.name,
      email: req.body.email,
      profilePicture: req.body.profilePicture
    };

    User.findOne({username: username})
      .then((user) => {
        if (user != null && user._id != userID) {
          res.status(401).send({
            success: false,
            message: 'Username already exist'
          });
        } else {
          User.findByIdAndUpdate(
            userID,
            { $set: userData },
            { safe: true, upsert: true, new: true, select: '-chatRooms -blockedUsers -socketID' }
          )
          .then((user) => {
            res.status(200).send({
              success: true,
              message: 'Your profile is updated successfully',
              user: user
            });
          })
          .catch((error) => {
            res.status(500).send({
              success: false,
              message: 'Server Error!'
            });
          });
        }
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
  const userID = req.body.userID;

  if (req.user === undefined || req.user.role !== 'admin') {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    ChatRoom.find({members: {$in: userID}, chatType: {$in: ["private", "direct"]}})
      .then((chatRooms) => {
        for (let i = 0; i < chatRooms.length; i += 1) {
          const chatRoom = chatRooms[i];
          const chatRoomID = chatRoom._id;

          for (let j = 0; j < chatRoom.members.length; j += 1) {
            const memberID = chatRoom.members[j];

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
        for (let i = 0; i < chatRooms.length; i += 1) {
          const chatRoom = chatRooms[i];
          const chatRoomID = chatRoom._id;

          Message.deleteMany({user: userID, chatRoom: chatRoomID}).exec();
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
