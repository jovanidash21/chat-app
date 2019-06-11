const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const Strategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../../../models/User');
const ChatRoom = require('../../../models/ChatRoom');
const popupTools = require('popup-tools');

passport.use(new Strategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: '/api/login/linkedin/callback',
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, (accessToken, refreshToken, profile, done) => {
  const username = 'linkedin/' + profile.id;
  const name = profile.displayName;
  let email;
  let profilePicture;

  if (profile.emails !== undefined) {
    email = profile.emails[0].value;
  } else {
    email = '';
  }

  if (profile._json.pictureUrls.values !== undefined) {
    profilePicture = profile._json.pictureUrls.values[0];
  } else {
    profilePicture = '';
  }

  const userData = {
    username: username,
    name: name,
    email: email,
    profilePicture: profilePicture,
    accountType: 'linkedin'
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


router.get('/', passport.authenticate('linkedin'));

router.get('/callback', passport.authenticate('linkedin'), (req, res) => {
  res.send(popupTools.popupResponse({
    data: {
      success: true,
      message: 'Login Successful',
      userData: req.user
    }
  }));
});

module.exports = router;
