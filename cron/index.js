const CronJob = require('cron').CronJob;
const User = require('../models/User');

const cron = function(socket) {
  const cronJob = new CronJob('0 */1 * * * *', function() {
    
  }, null, true);
}

module.exports = cron;
