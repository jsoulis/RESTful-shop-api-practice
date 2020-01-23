//import http package
const http = require('http');
const app = require('./app');

//get port from environment variable or hardcoded, 3000
const port = process.env.PORT || 3000;

//create server with http package
//we need to pass a listener to createServer to handle requests and return responses
const server = http.createServer(app);

//start server to listen on port specified
server.listen(port);