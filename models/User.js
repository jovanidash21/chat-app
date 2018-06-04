var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

var userChatRoomSchema = new Schema (
  {
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom',
    },
    unReadMessages: {
      type: Number,
      default: 0,
    },
  },
  {
    _id : false,
  },
);

var userSchema = new Schema (
  {
    name: String,
    email: String,
    profilePicture: {
      type: String,
      default: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-profile-picture.jpg',
    },
    chatRooms: [userChatRoomSchema],
    accountType: {
      type: String,
      enum: [
        'local',
        'facebook',
        'google',
        'twitter',
        'instagram',
        'linkedin',
        'github',
      ],
      default: 'local',
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    socketID: {
      type: String,
      default: '',
    },
  },
  {
    collection: 'User',
  },
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(timestamps);

module.exports = mongoose.model('User', userSchema);
