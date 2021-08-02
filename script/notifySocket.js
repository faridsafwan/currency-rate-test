const io = require('socket.io')(3000, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

io.use((socket, next) => {
  if (socket.handshake.auth.token) {
    // Should extract data from token
    // I just keep it simple for now
    socket.userId = socket.handshake.auth.token;
    next();
  } else {
    next(new Error('Please send token'));
  }
});

io.on('connection', (socket) => {
  let payload;
  if (socket.userId === 'buyer') {
    payload = [
      {
        orderId: '223309',
        status: 'Paid',
      },
    ];
    io.to(socket.id).emit('buyer-notification', payload);
  }
  if (socket.userId === 'seller') {
    payload = [
      {
        orderId: '223309',
        status: 'Paid',
      },
    ];
    io.to(socket.id).emit('seller-notification', payload);
  }
});

console.log('Socket is running . . . ');
