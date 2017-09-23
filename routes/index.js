var express = require('express');
var router = express.Router();

router.get(['/', '/register'], function(req, res, next) {
  if (!req.user) { 
    res.render('index', { title: 'Chat App' });
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

module.exports = router;