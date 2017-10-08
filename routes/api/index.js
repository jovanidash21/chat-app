var express = require('express');
var router = express.Router();

router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/logout', require('./logout'));
router.use('/send-email', require('./send-email'));
router.use('/user', require('./user'));

module.exports = router;