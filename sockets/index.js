var sockets = function(socket) {  
  console.log('User has connected');

  socket.on('typing', function (username, chatRoom) {
    socket.broadcast.to(chatRoom).emit('typing broadcast', username);
  });

  socket.on('not typing', function (username, chatRoom) {
    socket.broadcast.to(chatRoom).emit('not typing broadcast', username);
  });
};

module.exports = sockets;