var sockets = function(socket) {
  socket.on('action', (action) => {
    switch(action.type) {
      case 'SOCKET_JOIN_CHAT_ROOM':
        socket.join(action.chatRoom);
        break;
      case 'SOCKET_LEAVE_CHAT_ROOM':
        socket.leave(action.chatRoom);
        break;
      default:
        break;
    }
  });
};

module.exports = sockets;
