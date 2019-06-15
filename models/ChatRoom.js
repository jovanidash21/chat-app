const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

const chatRoomSchema = new Schema (
  {
    name: {
      type: String,
      default: '',
    },
    chatIcon: {
      type: String,
      default: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg',
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    chatType: {
      type: String,
      enum: [
        'private',
        'direct',
        'group',
        'public',
      ],
      default: 'group',
    },
    latestMessageDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'ChatRoom',
  },
);

chatRoomSchema.plugin(timestamps);

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
