const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const Strategy = require('passport-google-oauth2').Strategy;
const User = require('../../../models/User');
const ChatRoom = require('../../../models/ChatRoom');
const popupTools = require('popup-tools');

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/login/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  const username = 'google/' + profile.id;
  const name = profile.displayName;
  const email = profile.email;
  let profilePicture;

  if (profile.photos !== undefined) {
    profilePicture = profile.photos[0].value;
    profilePicture = profilePicture.replace('sz=50', 'sz=200');
  } else {
    profilePicture = '';
  }

  const userData = {
    username: username,
    name: name,
    email: email,
    profilePicture: profilePicture,
    accountType: 'google'
  }

  User.findOne({username: username}, (err, user) => {
    if (!err) {
      if (user !== null) {
        user.updateOne(userData, (err) => {
          if (!err) {
            return done(null, user);
          } else {
            return done(err);
          }
        });
      } else {
        const newUser = new User(userData);

        newUser.save()
          .then((userData) => {
            const chatLoungeID = process.env.MONGODB_CHAT_LOUNGE_ID;
            const userID = userData._id;
            const chatRoomData = {
              name: newUser.name,
              chatIcon: '',
              members: [userID],
              chatType: 'private'
            };
            const chatRoom = new ChatRoom(chatRoomData);

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

            return chatRoom.save();
          })
          .then((chatRoomData) => {
            const chatRoomID = chatRoomData._id;

            User.findByIdAndUpdate(
              newUser._id,
              { $push: { chatRooms: { data: chatRoomID, mute: {} } } },
              { safe: true, upsert: true, new: true }
            ).exec();

            return done(null, newUser);
          })
          .catch((error) => {
            return done(err);
          });
      }
    } else {
      return done(err);
    }
  });
}));

router.get('/', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
}));

router.get('/callback', passport.authenticate('google'), (req, res) => {
  res.send(popupTools.popupResponse({
    data: {
      success: true,
      message: 'Login Successful',
      userData: req.user
    }
  }));
});

module.exports = router;
