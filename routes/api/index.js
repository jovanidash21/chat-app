var express = require('express');
var router = express.Router();

router.use('/logout', require('./logout'));
router.use('/user', require('./user'));

module.exports = router;