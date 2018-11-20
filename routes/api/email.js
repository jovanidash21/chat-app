var express = require('express');
var router = express.Router({mergeParams: true});
var nodemailer = require('nodemailer');

router.post('/', (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'chatapp921@gmail.com',
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: process.env.GMAIL_ACCESS_TOKEN,
    }
  });
  var mailOptions = {
    from: 'Chat App <noreply@chatapp.com>',
    to: req.body.email,
    subject: 'Welcome to Chat App',
    text: 'Hi ' + req.body.username + ', Thank you for creating an account.',
    html: '<p>Hi ' + req.body.username + ', Thank you for creating an account.</p>'
  };
  transporter.sendMail(mailOptions, (err, response) => {
    if (!err) {
      res.status(200).send({
        success: true,
        message: 'Email Sent.'
      });
    } else {
      res.status(500).send({
        success: false,
        message: 'Server Error!'
      });
    }
    transporter.close();
  });
});

module.exports = router;
