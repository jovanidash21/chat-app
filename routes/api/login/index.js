var express = require('express');
var router = express.Router();

router.use('/mongoose', require('./mongoose'));
router.use('/facebook', require('./facebook'));

module.exports = router;