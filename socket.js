const users = require('./src/controllers/scoketUsers_controller');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`A user connected:`, socket.id);
        // Register user ID on connection
        socket.on('register', (userId) => {
            // users[userId] = socket.id;
            users.addUser (userId.userId, socket.id);
            console.log(`User registered: ${JSON.stringify(userId)} with socket ID: ${socket.id}`);
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            users.removeUser (socket.id);
            // for (const userId in users) {
            //     if (users[userId] === socket.id) {
            //         delete users[userId];
            //     }
            // }
        });
    });

    return async (socketIds, event, msg) => {
        io.to(socketIds).emit(event, msg);
    }
};
