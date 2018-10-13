var CronJob = require('cron').CronJob;
var User = require('../models/User');

var cron = function(socket) {
  var cronJob = new CronJob('0 */1 * * * *', function() {
    
  }, null, true);
}

module.exports = cron;
