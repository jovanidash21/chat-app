const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

const userEndDateSchema = new Schema (
  {
    data: {
      type: Boolean,
      default: false,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id : false,
  },
);

const userChatRoomSchema = new Schema (
  {
    data: {
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom',
    },
    unReadMessages: {
      type: Number,
      default: 0,
    },
    mute: userEndDateSchema,
  },
  {
    _id : false,
  },
);

const userSchema = new Schema (
  {
    name: String,
    email: String,
    profilePicture: {
      type: String,
      default: '',
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
    role: {
      type: String,
      enum: [
        'admin',
        'ordinary',
      ],
      default: 'ordinary',
    },
    blockedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
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
