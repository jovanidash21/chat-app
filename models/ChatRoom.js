var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

var chatRoomsDataSchema = new Schema
(
  {
    name: {
      type: String,
      default: ''
    },
    chatIcon: {
      type: String,
      default: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg'
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    chatType: {
      type: String,
      enum: [
        'private',
        'direct',
        'group'
      ],
      default: 'group'
    },
  },
  {
    collection: 'ChatRoom'
  }
);

chatRoomsDataSchema.plugin(timestamps);

module.exports = mongoose.model('ChatRoom', chatRoomsDataSchema);
