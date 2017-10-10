var sockets = function(socket) {  
  console.log('User has connected');
  socket.on('message', function(user) { 
    console.log('Message received');
  });
};

module.exports = sockets;