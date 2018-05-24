var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

var usersDataSchema = new Schema
(
  {
    name: String,
    email: String,
    profilePicture: {
      type: String,
      default: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-profile-picture.jpg'
    },
    chatRooms: [{
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom'
    }],
    accountType: {
      type: String,
      enum: [
        'local',
        'facebook',
        'google',
        'twitter',
        'instagram',
        'linkedin',
        'github'
      ],
      default: 'local'
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    socketID: {
      type: String,
      default: ''
    }
  },
  {
    collection: 'User'
  }
);

usersDataSchema.plugin(passportLocalMongoose);
usersDataSchema.plugin(timestamps);

module.exports = mongoose.model('User', usersDataSchema);
