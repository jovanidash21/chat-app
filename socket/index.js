const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const cron = require('../cron');

const connectedUsers = {};

const sockets = function(io) {
  io.sockets.on('connection', function (socket) {
    cron(socket);

    socket.on('action', (action) => {
      switch(action.type) {
        case 'SOCKET_USER_LOGIN': {
          User.findByIdAndUpdate(
            action.userID,
            { $set: { isOnline: true, socketID: socket.id } },
            { safe: true, upsert: true, new: true, select: '-chatRooms -blockedUsers -socketID' },
          )
          .then((user) => {
            connectedUsers[socket.id] = user._id;

            socket.broadcast.emit('action', {
              type: 'SOCKET_BROADCAST_USER_LOGIN',
              user: user,
            });
          })
          .catch((error) => {
            console.log(error);
          });
          break;
        }
        case 'SOCKET_EDIT_ACTIVE_USER':
          socket.broadcast.emit('action', {
            type: 'SOCKET_BROADCAST_EDIT_ACTIVE_USER',
            user: action.user,
          });
          break;
        case 'SOCKET_JOIN_CHAT_ROOM': {
          socket.join(action.chatRoomID);
          break;
        }
        case 'SOCKET_LEAVE_CHAT_ROOM': {
          socket.leave(action.chatRoomID);
          break;
        }
        case 'SOCKET_IS_TYPING': {
          socket.broadcast.to(action.chatRoomID).emit('action', {
            type: 'SOCKET_BROADCAST_IS_TYPING',
            typer: action.typer,
            chatRoomID: action.chatRoomID,
          });
          break;
        }
        case 'SOCKET_IS_NOT_TYPING': {
          socket.broadcast.to(action.chatRoomID).emit('action', {
            type: 'SOCKET_BROADCAST_IS_NOT_TYPING',
            typer: action.typer,
            chatRoomID: action.chatRoomID,
          });
          break;
        }
        case 'SOCKET_CREATE_CHAT_ROOM': {
          for (let i = 0; i < action.members.length; i += 1) {
            const chatRoomMember = action.members[i];

            User.findById(chatRoomMember)
              .then((user) => {
                socket.broadcast.to(user.socketID).emit('action', {
                  type: 'SOCKET_BROADCAST_CREATE_CHAT_ROOM',
                  chatRoom: action.chatRoomBroadcast,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
          break;
        }
        case 'SOCKET_SEND_MESSAGE': {
          let chatRoomClients = [];
          let blockedUsers = [];

          io.in(action.chatRoomID).clients((err, clients) => {
            if (!err) {
              chatRoomClients = clients;
            }
          });

          User.findById(action.userID, 'blockedUsers')
            .then((user) => {
              blockedUsers = user.blockedUsers;

              return ChatRoom.findById(action.chatRoomID)
                .populate('members')
                .exec();
            })
            .then((chatRoom) => {
              const usernames = [];

              if (action.message.text.length > 0) {
                const taggedUsernames = action.message.text.match(/<@(\w+)>/ig);

                if (taggedUsernames !== null && taggedUsernames.length > 0) {
                  for (let i = 0; i < taggedUsernames.length; i += 1) {
                    usernames.push(taggedUsernames[i].slice(2, -1));
                  }
                }
              }

              for (let i = 0; i < chatRoom.members.length; i += 1) {
                const chatRoomMember = chatRoom.members[i];

                if (blockedUsers.indexOf(chatRoomMember._id) === -1) {
                  User.findById(chatRoomMember._id)
                    .populate({
                      path: 'chatRooms.data',
                      select: '-members',
                    })
                    .exec()
                    .then((user) => {
                      if (user.blockedUsers.indexOf(action.userID) === -1) {
                        if (chatRoomClients.indexOf(user.socketID) > -1) {
                          User.updateOne(
                            { _id: user._id, 'chatRooms.data': action.chatRoomID },
                            { $set: { 'chatRooms.$.unReadMessages': 0 } },
                            { safe: true, upsert: true, new: true }
                          ).exec();

                          socket.broadcast.to(user.socketID).emit('action', {
                            type: 'SOCKET_BROADCAST_SEND_MESSAGE',
                            message: action.message
                          });
                        } else {
                          const chatRoomIndex = user.chatRooms.findIndex(singleChatRoom => {
                            return singleChatRoom.data._id == action.chatRoomID && !singleChatRoom.mute.data;
                          });

                          if (chatRoomIndex > -1) {
                            const singleChatRoom = user.chatRooms[chatRoomIndex];
                            let socketNotifyType = 'SOCKET_BROADCAST_NOTIFY_MESSAGE';

                            if (singleChatRoom.data.chatType === 'direct') {
                              singleChatRoom.data.name = action.message.user.name;
                              singleChatRoom.data.chatIcon = action.message.user.profilePicture;
                              singleChatRoom.data.members = chatRoom.members;
                            }

                            if (usernames.length > 0 && usernames.indexOf(user.username) > -1) {
                              socketNotifyType = 'SOCKET_BROADCAST_NOTIFY_MESSAGE_MENTION';
                            }

                            socket.broadcast.to(user.socketID).emit('action', {
                              type: socketNotifyType,
                              chatRoom: singleChatRoom,
                              chatRoomID: action.chatRoomID,
                              chatRoomName: singleChatRoom.data.name,
                              senderName: action.message.user.name,
                            });
                          }
                        }
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        case 'SOCKET_DELETE_MESSAGE': {
          let chatRoomClients = [];

          io.in(action.chatRoomID).clients((err, clients) => {
            if (!err) {
              chatRoomClients = clients;
            }
          });

          ChatRoom.findById(action.chatRoomID)
            .populate('members')
            .exec()
            .then((chatRoom) => {
              for (let i = 0; i < chatRoom.members.length; i += 1) {
                const chatRoomMember = chatRoom.members[i];

                User.findById(chatRoomMember._id)
                  .then((user) => {
                    if (chatRoomClients.indexOf(user.socketID) > -1) {
                      socket.broadcast.to(user.socketID).emit('action', {
                        type: 'SOCKET_BROADCAST_DELETE_MESSAGE',
                        messageID: action.messageID,
                        chatRoomID: action.chatRoomID,
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
        }
        case 'SOCKET_REQUEST_VIDEO_CALL': {
          let callerUser = {};

          User.findById(action.callerID, '-chatRooms -blockedUsers -socketID')
            .then((user) => {
              callerUser = user;

              return User.findById(action.receiverID);
            })
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_REQUEST_VIDEO_CALL',
                user: callerUser,
                peerID: action.peerID,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        case 'SOCKET_CANCEL_REQUEST_VIDEO_CALL':{
          User.findById(action.receiverID)
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_CANCEL_REQUEST_VIDEO_CALL',
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        case 'SOCKET_REJECT_VIDEO_CALL': {
          User.findById(action.callerID)
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_REJECT_VIDEO_CALL',
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        case 'SOCKET_ACCEPT_VIDEO_CALL': {
          User.findById(action.callerID)
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_ACCEPT_VIDEO_CALL',
                peerID: action.peerID,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        case 'SOCKET_END_VIDEO_CALL': {
          User.findById(action.callerID)
            .then((user) => {
              socket.broadcast.to(user.socketID).emit('action', {
                type: 'SOCKET_BROADCAST_END_VIDEO_CALL',
              });
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        default:
          break;
      }
    });

    socket.on('disconnect', function() {
      User.findByIdAndUpdate(
        connectedUsers[socket.id],
        { $set: { isOnline: false, socketID: '' } },
        { safe: true },
      )
      .then((user) => {
        if ( user !== null && user._id !== null ) {
          socket.broadcast.emit('action', {
            type: 'SOCKET_BROADCAST_USER_LOGOUT',
            userID: user._id,
          });
        }

        delete connectedUsers[socket.id];
      })
      .catch((error) => {
        console.log(error);
      });
    });

    User.find({_id: {$ne: null}})
      .then((users) => {
        for (let i = 0; i < users.length; i += 1) {
          const user = users[i];

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
