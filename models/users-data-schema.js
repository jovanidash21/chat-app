var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var timestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

var usersDataSchema = new Schema
(
  {
    firstName: {type:String, default: ''},
    lastName: {type:String, default: ''},
    email: {type:String, default: ''},
    socialLinks: [{
      website: {type: String, default: ''},
      facebook: {type: String, default: ''},
      twitter: {type: String, default: ''},
      instagram: {type: String, default: ''},
      googleplus: {type: String, default: ''},
      linkedin: {type: String, default: ''},
      youtube: {type: String, default: ''},
      github: {type: String, default: ''},
      codepen: {type: String, default: ''}
    }]
  },
  {
    collection: 'usersData'
  }
);

usersDataSchema.plugin(passportLocalMongoose);
usersDataSchema.plugin(timestamps);

module.exports = mongoose.model('usersData', usersDataSchema);