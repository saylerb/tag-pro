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


module.exports = server;
