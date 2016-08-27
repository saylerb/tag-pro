
// require node built-in http server
const http = require('http') 

// require express (sintra-like wrapper around http)
const express = require('express') 

// instantiate the express app
const app = express() 

// tell express to serve the public folder as static assets
app.use(express.static('public')) 

// setup express to serve up index.html if user visits the root
app.get('/',  function(req, res) {
  res.sendFile(__dirname + '/public/index.html')  
})                                                

// pass the express app to the http module
var server = http.createServer(app) 

// tell the server what port to listen on
// if ENV variable setup, listen to that, else default to 3000
var port = process.env.PORT || 3000

var server = http.createServer(app)
server.listen(port, function() {
  console.log('Listening on port ' + port + '.')
})

// SocketIo setup
const socketIo = require('socket.io')
const io = socketIo(server)

// setup listening for a connection
// a connection will fire off the callback on the socket that was connected to

// setup a connection event to log the number of clients connected
io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount)

  // send a msg to all clients telling them the total user connected
  io.sockets.emit('usersConnected', io.engine.clientsCount)
  
  // listen for a disconnection of a specific socket
  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount)

    // send a msg to all clients telling them the total user connected
    io.sockets.emit('usersConnected', io.engine.clientsCount)

  })
})

module.exports = server;
