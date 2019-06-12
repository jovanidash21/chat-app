const express = require('express');
const router = express.Router();

router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/email', require('./email'));
router.use('/user', require('./user'));
router.use('/chat-room', require('./chat-room'));
router.use('/message', require('./message'));
router.use('/member', require('./member'));
router.use('/blocked-user', require('./blocked-user'));
router.use('/upload', require('./upload'));

module.exports = router;
