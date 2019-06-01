const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom');

router.get('/admin', (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

router.get('/dashboard', (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | Dashboard' });
  } else {
    res.redirect('/');
  }
});

router.get('/all-users', (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | All Users' });
  } else {
    res.redirect('/');
  }
});

router.get('/create-user', (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | Create User' });
  } else {
    res.redirect('/');
  }
});

router.get('/edit-user/:userID', (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | Edit User' });
  } else {
    res.redirect('/');
  }
});

router.get('/all-chat-rooms', (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | All Chat Rooms' });
  } else {
    res.redirect('/');
  }
});

router.get('/create-chat-room', (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    res.render('admin', { title: 'Chat App | Create Chat Room' });
  } else {
    res.redirect('/');
  }
});

router.get('/edit-chat-room/:chatRoomID', (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    const chatRoomID = req.params.chatRoomID;

    ChatRoom.findById(chatRoomID)
      .exec()
      .then((chatRoom) => {
        if (chatRoom.chatType === 'group') {
          res.render('admin', { title: 'Chat App | Edit Chat Room' });
        } else {
          res.redirect('/admin');
        }
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: 'Server Error!'
        });
      });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
