const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

const messageSchema = new Schema (
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
        'image',
        'audio',
      ],
      default: 'text',
    },
    fileLink: {
      type: String,
      default: '',
    },
  },
  {
    collection: 'Message',
  },
);

messageSchema.plugin(timestamps);

module.exports = mongoose.model('Message', messageSchema);
