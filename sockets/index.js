var sockets = function(socket) {  
  console.log('User has connected');

  socket.on('typing', function (name, chatRoom) {
    socket.broadcast.to(chatRoom).emit('typing broadcast', name);
  });

  socket.on('not typing', function (name, chatRoom) {
    socket.broadcast.to(chatRoom).emit('not typing broadcast', name);
  });

  socket.on('join chat room', function(chatRoom) {
    socket.join(chatRoom)
  })

  socket.on('leave chat room', function(chatRoom) {
    socket.leave(chatRoom)
  });

  socket.on('new message', function(data, chatRoom) {
    socket.broadcast.to(chatRoom).emit('new message broadcast', data);
  });
};

module.exports = sockets;
