var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/', function(req, res, next) {
  if (req.user === undefined) {
    res.status(401).send({
      success: false, 
      message: 'Unauthorized'
    });
  }
  else {
    res.status(200).json([req.user]);
  }
});

module.exports = router;
