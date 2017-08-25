var express = require('express');
var router = express.Router({mergeParams: true});

router.post('/', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;