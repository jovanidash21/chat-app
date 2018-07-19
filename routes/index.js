var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.user) {
    res.render('index', { title: 'Chat App | Login' });
  } else {
    res.redirect('/chat');
  }
});

router.get('/register', function(req, res, next) {
  if (!req.user) {
    res.render('index', { title: 'Chat App | Register' });
  } else {
    res.redirect('/chat');
  }
});

router.get('/chat', function(req, res, next) {
  if (req.user) {
    res.render('index', { title: 'Chat App' });
  } else {
    res.redirect('/');
  }
});

router.get('/admin', function(req, res, next) {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | Admin' });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
