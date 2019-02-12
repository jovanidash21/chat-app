var User = require('../models/User');
var ChatRoom = require('../models/ChatRoom');
var Message = require('../models/Message');
var cron = require('../cron');

var connectedUsers = {};

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
            connectedUsers[socket.id] = action.user._id;

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
                  .populate({
                    path: 'chatRooms.data'
                  })
                  .exec()
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

                      for (var j = 0; j < user.chatRooms.length; j++) {
                        var singleChatRoom = user.chatRooms[j];

                        if ( singleChatRoom.data._id == action.chatRoomID && !singleChatRoom.mute.data ) {
                          socket.broadcast.to(user.socketID).emit('action', {
                            type: 'SOCKET_BROADCAST_NOTIFY_MESSAGE',
                            chatRoom: singleChatRoom,
                            chatRoomID: action.chatRoomID,
                            chatRoomName: chatRoom.name,
                            senderName: action.message.user.name
                          });
                          break;
                        }
                      }
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
        case 'SOCKET_REQUEST_VIDEO_CALL':
          var callerUser = {};

          User.findById(action.callerID)
            .then((user) => {
              callerUser = user;

              return User.findById(action.receiverID);
            })
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_REQUEST_VIDEO_CALL',
                user: callerUser,
                peerID: action.peerID
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case 'SOCKET_CANCEL_REQUEST_VIDEO_CALL':
          User.findById(action.receiverID)
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_CANCEL_REQUEST_VIDEO_CALL'
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case 'SOCKET_REJECT_VIDEO_CALL':
          User.findById(action.callerID)
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_REJECT_VIDEO_CALL'
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case 'SOCKET_ACCEPT_VIDEO_CALL':
          User.findById(action.callerID)
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_ACCEPT_VIDEO_CALL',
                peerID: action.peerID
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case 'SOCKET_END_VIDEO_CALL':
          User.findById(action.callerID)
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_END_VIDEO_CALL'
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        default:
          break;
      }
    });

    socket.on('disconnect', function() {
      User.findByIdAndUpdate(
        connectedUsers[socket.id],
        { $set: { isOnline: false, socketID: ''} },
        { safe: true, upsert: true, new: true },
      )
      .then((user) => {
        socket.emit('action', {
          type: 'SOCKET_BROADCAST_USER_LOGOUT',
          userID: connectedUsers[socket.id]
        });

        delete connectedUsers[socket.id];
      })
      .catch((error) => {
        console.log(error);
      });
    });

    User.find({_id: {$ne: null}})
      .then((users) => {
        for (var i = 0; i < users.length; i++) {
          var user = users[i];

          if (!(user.socketID in connectedUsers) && connectedUsers[user.socketID] != user._id) {
            User.findByIdAndUpdate(
              user._id,
              { $set: { isOnline: false, socketID: ''} },
              { safe: true, upsert: true, new: true },
            ).exec();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

module.exports = sockets;
