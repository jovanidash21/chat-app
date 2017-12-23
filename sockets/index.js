var sockets = function(socket) {
  socket.on('user logged in', function (user) {
    socket.broadcast.emit('user logged in broadcast', user);
  });

  socket.on('typing', function (typer, chatRoom) {
    socket.broadcast.to(chatRoom).emit('typing broadcast', typer);
  });

  socket.on('not typing', function (typer, chatRoom) {
    socket.broadcast.to(chatRoom).emit('not typing broadcast', typer);
  });

  socket.on('join chat room', function(chatRoom) {
    socket.join(chatRoom)
  })

  socket.on('leave chat room', function(chatRoom) {
    socket.leave(chatRoom)
  });

  socket.on('new chat room', function(chatRoom) {
    socket.broadcast.emit('new chat room broadcast', chatRoom)
  });

  socket.on('new message', function(message, chatRoom) {
    socket.broadcast.to(chatRoom).emit('new message broadcast', message);
  });
};

module.exports = sockets;
