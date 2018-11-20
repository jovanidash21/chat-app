var express = require('express');
var router = express.Router({mergeParams: true});
var multer = require('multer');
var slash = require('slash');

var imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

var imageFilter = (req, file, cb) => {
  if ( file.mimetype.indexOf('image/') > -1 ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

router.post('/image', imageUpload.single('image'), (req, res, next) => {
  if (req.user === undefined) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized'
    });
  } else {
    var imageLink = slash(req.protocol + '://' + req.get('host') + '/' + req.file.path);

    res.status(200).send({
      success: true,
      message: 'Image Uploaded',
      imageLink: imageLink
    });
  }
});

module.exports = router;
