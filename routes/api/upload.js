const express = require('express');
const router = express.Router({mergeParams: true});
const multer = require('multer');
const slash = require('slash');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/avatar/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const imageFilter = (req, file, cb) => {
  if ( file.mimetype.indexOf('image/') > -1 ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imageUpload = multer({
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
    const imageLink = slash(req.protocol + '://' + req.get('host') + '/' + req.file.path);

    res.status(200).send({
      success: true,
      message: 'Image Uploaded',
      imageLink: imageLink
    });
  }
});

module.exports = router;
