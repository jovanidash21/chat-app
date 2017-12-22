var express = require('express');
var router = express.Router();

router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/logout', require('./logout'));
router.use('/email', require('./email'));
router.use('/user', require('./user'));
router.use('/chat-room', require('./chat-room'));
router.use('/message', require('./message'));

module.exports = router;
