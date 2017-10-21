var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

var chatRoomsDataSchema = new Schema
(
  {
    name: String,
    private: Boolean,
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'usersData'
    }]
  },
  {
    collection: 'chatRoomsData'
  }
);

chatRoomsDataSchema.plugin(timestamps);

module.exports = mongoose.model('chatRoomsData', chatRoomsDataSchema);