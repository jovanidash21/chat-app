var User = require('../models/User');
var ChatRoom = require('../models/ChatRoom');
var Message = require('../models/Message');
var cron = require('../cron');

var users = {};

var sockets = function(io) {
  io.sockets.on('connection', function (socket) {
    cron(socket);

    socket.on('action', (action) => {
      switch(action.type) {
        case 'SOCKET_USER_LOGIN':
          User.findByIdAndUpdate(
            action.user._id,
            { $set: { isOnline: true, socketID: socket.id } },
            { safe: true, upsert: true, new: true },
          )
          .then((user) => {
            users[socket.id] = action.user._id;

            socket.broadcast.emit('action', {
              type: 'SOCKET_BROADCAST_USER_LOGIN',
              user: action.user
            });
          })
          .catch((error) => {
            console.log(error);
          });
          break;
        case 'SOCKET_JOIN_CHAT_ROOM':
          socket.join(action.chatRoomID);
          break;
        case 'SOCKET_LEAVE_CHAT_ROOM':
          socket.leave(action.chatRoomID);
          break;
        case 'SOCKET_IS_TYPING':
          socket.broadcast.to(action.chatRoomID).emit('action', {
            type: 'SOCKET_BROADCAST_IS_TYPING',
            typer: action.typer,
            chatRoomID: action.chatRoomID
          });
          break;
        case 'SOCKET_IS_NOT_TYPING':
          socket.broadcast.to(action.chatRoomID).emit('action', {
            type: 'SOCKET_BROADCAST_IS_NOT_TYPING',
            typer: action.typer,
            chatRoomID: action.chatRoomID
          });
          break;
        case 'SOCKET_CREATE_CHAT_ROOM':
          for (var i = 0; i < action.members.length; i++) {
            var chatRoomMember = action.members[i];

            User.findById(chatRoomMember)
              .then((user) => {
                socket.broadcast.to(user.socketID).emit('action', {
                  type: 'SOCKET_BROADCAST_CREATE_CHAT_ROOM',
                  chatRoom: action.chatRoomBroadcast
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
          break;
        case 'SOCKET_SEND_MESSAGE':
          var chatRoomClients = [];

          io.in(action.chatRoomID).clients((err, clients) => {
            if (!err) {
              chatRoomClients = clients;
            }
          });

          ChatRoom.findById(action.chatRoomID)
            .populate('members')
            .exec()
            .then((chatRoom) => {
              for (var i = 0; i < chatRoom.members.length; i++) {
                var chatRoomMember = chatRoom.members[i];

                User.findById(chatRoomMember)
                  .then((user) => {
                    if (chatRoomClients.indexOf(user.socketID) > -1) {
                      Message.findOneAndUpdate(
                        { _id: action.message._id, readBy: { $ne: user._id } },
                        { $addToSet: { readBy: user._id } },
                        { safe: true }
                      ).exec();

                      User.update(
                        { _id: user._id, 'chatRooms.data': action.chatRoomID },
                        { $set: { 'chatRooms.$.unReadMessages': 0 } },
                        { safe: true, upsert: true, new: true }
                      ).exec();

                      socket.broadcast.to(user.socketID).emit('action', {
                        type: 'SOCKET_BROADCAST_SEND_MESSAGE',
                        message: action.message
                      });
                    } else {
                      if (chatRoom.chatType === 'direct') {
                        chatRoom.name = action.message.user.name;
                      }

                      socket.broadcast.to(user.socketID).emit('action', {
                        type: 'SOCKET_BROADCAST_NOTIFY_MESSAGE',
                        chatRoom: {data: chatRoom, unReadMessages: 0},
                        chatRoomID: action.chatRoomID,
                        chatRoomName: chatRoom.name,
                        senderName: action.message.user.name
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case 'SOCKET_DELETE_MESSAGE':
          var chatRoomClients = [];

          io.in(action.chatRoomID).clients((err, clients) => {
            if (!err) {
              chatRoomClients = clients;
            }
          });

          ChatRoom.findById(action.chatRoomID)
            .populate('members')
            .exec()
            .then((chatRoom) => {
              for (var i = 0; i < chatRoom.members.length; i++) {
                var chatRoomMember = chatRoom.members[i];

                User.findById(chatRoomMember)
                  .then((user) => {
                    if (chatRoomClients.indexOf(user.socketID) > -1) {
                      socket.broadcast.to(user.socketID).emit('action', {
                        type: 'SOCKET_BROADCAST_DELETE_MESSAGE',
                        messageID: action.messageID,
                        chatRoomID: action.chatRoomID
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        default:
          break;
      }
      socket.on('disconnect', function() {
        User.findByIdAndUpdate(
          users[socket.id],
          { $set: { isOnline: false, socketID: ''} },
          { safe: true, upsert: true, new: true },
        )
        .then((user) => {
          socket.broadcast.emit('action', {
            type: 'SOCKET_BROADCAST_USER_LOGOUT',
            userID: users[socket.id]
          });

          delete users[socket.id];
        })
        .catch((error) => {
          console.log(error);
        });
      });
    });
  });
}

module.exports = sockets;
