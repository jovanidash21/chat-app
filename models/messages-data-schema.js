var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

var messagesDataSchema = new Schema
(
  {
    text: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'usersData'
    },
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: 'chatRoomsData'
    }
  },
  {
    collection: 'messagesData'
  }
);

messagesDataSchema.plugin(timestamps);

module.exports = mongoose.model('messagesData', messagesDataSchema);