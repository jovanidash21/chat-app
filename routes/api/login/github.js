var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-github').Strategy;
var User = require('../../../models/User');
var ChatRoom = require('../../../models/ChatRoom');
var popupTools = require('popup-tools');

passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/login/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  var username = 'github/' + profile.id;
  var name = profile.displayName;
  var email;
  var profilePicture;

  if (profile.emails !== undefined) {
    email = profile.emails[0].value;
  } else {
    email = '';
  }

  if (profile.photos !== undefined) {
    profilePicture = profile.photos[0].value;
  } else {
    profilePicture = '';
  }

  var userData = {
    username: username,
    name: name,
    email: email,
    profilePicture: profilePicture,
    accountType: 'github'
  }

  User.findOne({username: username}, function(err, user) {
    if (!err) {
      if (user !== null) {
        user.update(userData, function(err) {
          if (!err) {
            return done(null, user);
          } else {
            return done(err);
          }
        });
      } else {
        var newUser = new User(userData);

        newUser.save()
          .then((userData) => {
            var chatLoungeID = process.env.MONGODB_CHAT_LOUNGE_ID;
            var userID = userData._id;
            var chatRoomData = {
              name: newUser.name,
              chatIcon: '',
              members: [userID],
              chatType: 'private'
            };
            var chatRoom = new ChatRoom(chatRoomData);

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

            return chatRoom.save();
          })
          .then((chatRoomData) => {
            var chatRoomID = chatRoomData._id;

            User.findByIdAndUpdate(
              newUser._id,
              { $push: { chatRooms: { data: chatRoomID, unReadMessages: 0 } } },
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


router.get('/', passport.authenticate('github'));

router.get('/callback', passport.authenticate('github'), function(req, res) {
  res.send(popupTools.popupResponse({userData: req.user}));
});

module.exports = router;
