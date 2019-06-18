const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const User = require('../../models/User');
const ChatRoom = require('../../models/ChatRoom');

router.post('/', (req, res, next) => {
  const userData = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    accountType: 'local'
  };

  User.register(new User(userData), req.body.password, (err) => {
    if (!err) {
      passport.authenticate('local', (err, user) => {
        req.logIn(user, (err) => {
          if (!err ) {
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

                User.findByIdAndUpdate(
                  userID,
                  { $push: { chatRooms: { data: chatRoomID, mute: {} } } },
                  { safe: true, upsert: true, new: true }
                ).exec();
              })
              .then(() => {
                res.status(200).send({
                  success: true,
                  message: 'Login Successful',
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
            res.status(500).send({
              success: false,
              message: 'Server Error!'
            });
          }
        })
      })(req, res, next);
    } else {
      res.status(401).send({
        success: false,
        message: 'Sorry! Username already taken'
      });
    }
  });
});

module.exports = router;
