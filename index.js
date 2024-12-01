require('dotenv').config();
const http = require('http'); // Import http module
const { app } = require('./app');
const server = http.createServer(app); // Create HTTP server
const io = require('socket.io')(server); // Attach socket.io to the server
const socket = require('./socket')(io);
module.exports.socketEmitter = socket;

require('./src/db/db').connectDatabase();

// creating server
const port = process.env.PORT || 5000; // Default to 3000 if PORT is not set
console.log('server start @', port);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



// require('dotenv').config();
// const { app } = require('./app');
// const io = require('socket.io')(app);
// const socket = require('./socket')(io);
// module.exports.socketConnection = socket;

// require('./src/db/db').connectDatabase()


// // creating server
// const port = process.env.PORT;
// console.log('server start @', port)
// app.listen(port);
