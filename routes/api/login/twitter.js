var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var User = require('../../../models/User');
var ChatRoom = require('../../../models/ChatRoom');
var popupTools = require('popup-tools');

passport.use(new Strategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: '/api/login/twitter/callback',
  includeEmail: true
}, function(token, tokenSecret, profile, done) {
  var username = 'twitter/' + profile.id;
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
    profilePicture = profilePicture.replace('_normal', '_200x200');
  } else {
    profilePicture = '';
  }

  var userData = {
    username: username,
    name: name,
    email: email,
    profilePicture: profilePicture,
    accountType: 'twitter'
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

        newUser.save(function(err) {
          if (!err) {
            var chatLoungeID = process.env.MONGODB_CHAT_LOUNGE_ID;
            var userID = newUser._id;

            if (chatLoungeID) {
              ChatRoom.findByIdAndUpdate(
                chatLoungeID,
                { $push: { members: userID }},
                { safe: true, upsert: true, new: true },
                function(err) {
                  if (!err) {
                    done();
                  } else {
                    done(err);
                  }
                }
              );

              User.findByIdAndUpdate(
                userID,
                { $push: { chatRooms: { chatRoom: chatLoungeID, unReadMessages: 0 } } },
                { safe: true, upsert: true, new: true },
                function(err) {
                  if (!err) {
                    done();
                  } else {
                    done(err);
                  }
                }
              );
            }

            var chatRoomData = {
              name: newUser.name,
              chatIcon: newUser.profilePicture,
              members: [userID],
              chatType: 'private'
            };
            var chatRoom = new ChatRoom(chatRoomData);

            chatRoom.save(function(err, chatRoomData) {
              if (!err) {
                var chatRoomID = chatRoom._id;

                User.findByIdAndUpdate(
                  userID,
                  { $push: { chatRooms: { chatRoom: chatRoomID, unReadMessages: 0 } } },
                  { safe: true, upsert: true, new: true },
                  function(err) {
                    if (!err) {
                      done();
                    } else {
                      done(err);
                    }
                  }
                );
              } else {
                done(err);
              }
            });

            return done(null, newUser);
          } else {
            return done(err);
          }
        });
      }
    } else {
      return done(err);
    }
  });
}));

router.get('/', passport.authenticate('twitter'));

router.get('/callback', passport.authenticate('twitter'), function(req, res) {
  res.send(popupTools.popupResponse({userData: req.user}));
});

module.exports = router;
