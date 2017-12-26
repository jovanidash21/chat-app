var sockets = function(socket) {
  socket.on('action', (action) => {
    switch(action.type) {
      case 'SOCKET_JOIN_CHAT_ROOM':
        socket.join(action.chatRoom);
        break;
      case 'SOCKET_LEAVE_CHAT_ROOM':
        socket.leave(action.chatRoom);
        break;
      case 'SOCKET_IS_TYPING':
        socket.broadcast.to(action.chatRoom).emit('action', {
          type: 'SOCKET_BROADCAST_IS_TYPING',
          typer: action.typer
        });
        break;
      case 'SOCKET_IS_NOT_TYPING':
        socket.broadcast.to(action.chatRoom).emit('action', {
          type: 'SOCKET_BROADCAST_IS_NOT_TYPING',
          typer: action.typer
        });
        break;
      case 'SOCKET_CREATE_CHAT_ROOM':
        socket.broadcast.emit('action', {
          type: 'SOCKET_BROADCAST_CREATE_CHAT_ROOM',
          chatRoom: action.chatRoom
        });
        break;
      case 'SOCKET_SEND_MESSAGE':
        socket.broadcast.to(action.chatRoom).emit('action', {
          type: 'SOCKET_BROADCAST_SEND_MESSAGE',
          message: action.message
        });
        break;
      default:
        break;
    }
  });
};

module.exports = sockets;
