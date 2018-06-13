var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

var messageSchema = new Schema (
  {
    text: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom',
    },
    messageType: {
      type: String,
      enum: [
        'text',
        'file',
      ],
      default: 'text',
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    collection: 'Message',
  },
);

messageSchema.plugin(timestamps);

module.exports = mongoose.model('Message', messageSchema);
