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
    profilePicture: String,
    chatRooms: [{
      type: Schema.Types.ObjectId,
      ref: 'chatRoomsData'
    }]
  },
  {
    collection: 'usersData'
  }
);

usersDataSchema.plugin(passportLocalMongoose);
usersDataSchema.plugin(timestamps);

module.exports = mongoose.model('usersData', usersDataSchema);