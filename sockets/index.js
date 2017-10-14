var sockets = function(socket) {  
  console.log('User has connected');

  socket.on('message', function(user) { 
    console.log('Message received');
  });

  socket.on('typing', function (username) {
    socket.broadcast.emit('typing broadcast', username);
  });

  socket.on('not typing', function (username) {
    socket.broadcast.emit('not typing broadcast', username);
  });
};

module.exports = sockets;