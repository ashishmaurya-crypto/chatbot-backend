require('dotenv').config();
const socket = require('socket.io')
const { app } = require('./app');
require('./src/db/db').connectDatabase()


// creating server
const port = process.env.PORT;
console.log('server start @', port)
app.listen(port);

// const io = socket(app.listen(port), {
//     cors: {
//         origin : 'http://localhost:4000',
//         credentials : true,
//     },
// });

// global.onlineUsers = new Map();

// io.on("connection", (socket)=>{
//     global.chatSocket = socket;
//     socket.on("add-user", (userId)=> {
//         onlineUsers.set(userId, socket.id);
//     })
//     socket.on("send-msg", (data)=> {
//         const sendUserSocket = onlineUsers.get(data.io);
//         if(sendUserSocket){
//             socket.io(sendUserSocket).emit('msg-recieve', data.msg)
//         }
//     })

// })