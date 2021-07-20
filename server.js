const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
})

app.get('/', (req, res) => {
  res.send('hello world!');
});

io.on('connection', (socket) => {
  console.log('a user has connected');

  socket.on('message', (msg) => {
    socket.broadcast.emit('message-broadcast', { message: msg });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
})
