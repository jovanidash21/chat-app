var express = require('express');
var router = express.Router();

router.use('/mongoose', require('./mongoose'));

module.exports = router;