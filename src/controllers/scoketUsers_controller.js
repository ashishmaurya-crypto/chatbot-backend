// users.js
const users = {};

const addUser  = (userId, socketId) => {
    users[userId] = socketId;
};

const removeUser  = (socketId) => {
    for (const userId in users) {
        if (users[userId] === socketId) {
            delete users[userId];
            break; // Exit loop after removing the user
        }
    }
};

const getUsers = () => {
    return users;
};

module.exports = {
    addUser ,
    removeUser ,
    getUsers,
};