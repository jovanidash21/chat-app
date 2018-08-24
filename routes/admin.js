var express = require('express');
var router = express.Router();

router.get('/admin', function(req, res, next) {
  if (req.user && req.user.role == 'admin') {
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

router.get('/dashboard', function(req, res, next) {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | Dashboard' });
  } else {
    res.redirect('/');
  }
});

router.get('/all-users', function(req, res, next) {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | All Users' });
  } else {
    res.redirect('/');
  }
});

router.get('/create-user', function(req, res, next) {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | Create User' });
  } else {
    res.redirect('/');
  }
});

router.get('/edit-user/:userID', function(req, res, next) {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | Edit User' });
  } else {
    res.redirect('/');
  }
});

router.get('/all-chat-rooms', function(req, res, next) {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | All Chat Rooms' });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
