var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/', function(req, res, next) {
  if (req.user === undefined) {
    res.json([{}]);
  }
  else {
    res.json([req.user]);
  }
});

module.exports = router;
