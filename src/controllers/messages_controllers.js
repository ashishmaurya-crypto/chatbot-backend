const validator = require('express-validator');
const users = require('./../models/users_model');
const Group = require('./../models/group_model');
const ContactList = require('./../models/contact_model');
const Messages = require('./../models/messages_model');
const socket = require('./../../index');
const socketUser = require('./../controllers/scoketUsers_controller');


// Assuming `io` is the Socket.IO instance passed from your app's main setup
// const sendMessages = async (req, res, next, io) => {
//     try {
//         const { sender, recipients, content, messageType, attachment } = req.body;

//         // Validate required fields
//         if (!sender || !recipients || !content) {
//             return res.status(404).send({ success: false, message: 'Sender, recipients, and content are required' });
//         }

//         // Create and save the new message
//         const newMessage = new Messages({
//             sender,
//             recipients,
//             content,
//             messageType: messageType || 'text', // Default to 'text' if not provided
//             attachment
//         });

//         const savedMessage = await newMessage.save();

//         if (savedMessage) {
//             console.log('Message saved:', savedMessage);

//             // Emit the message through Socket.IO
//             io.to(recipients).emit('new_message', {
//                 sender,
//                 recipients,
//                 content,
//                 messageType,
//                 attachment,
//                 createdAt: savedMessage.createdAt // Assuming Mongoose adds a `createdAt` field
//             });

//             // Send response to the HTTP request
//             res.status(200).json({ success: true, message: 'Message sent successfully', data: savedMessage });
//         } else {
//             throw new Error('Failed to save message');
//         }
//     } catch (error) {
//         console.error('Error in sendMessages:', error);
//         res.status(500).send({ success: false, message: 'Error in sending message', error: error.message });
//     }
// };

const sendMessages = async (req, res, next) => {
    // console.log('=====request', req)
    // console.log('=====request', req.userDetail._id)
    try {
        const { sender, recipients, content, messageType, attachment } = req.body;
        if (!sender && !recipients && !content) {
            return res.status(404).send({ success: false, message: 'Sender, recipients, and content are required' });
        }

        const newMessage = new Messages({
            sender,
            recipients,
            content,
            messageType: messageType || 'text', // Default to 'text' if not provided
            attachment
        });
        const savedMessage = await newMessage.save();
        if (savedMessage) {
            console.log('savedMessage', savedMessage);

            let users = socketUser.getUsers();
            const recipientIds = savedMessage.recipients;
            const senderId = savedMessage.sender;
            // Convert each ObjectId to string
            const recipientIdsAsString = recipientIds.map(recipientId => recipientId.toString());

            const socketidR = users[recipientIdsAsString[0]];
            const socketidS = users[senderId.toString()];

            console.log('socketidS',socketidS)

            socket.socketEmitter(socketidR, 'new_message', savedMessage.content);
            socket.socketEmitter(socketidS, 'new_message', savedMessage.content)
            res.status(200).json({ success: true, message: 'add new message successfully' });
        } else {
            throw res.status(404).send({ success: false, message: 'Failed to save message!!!' });
        }
    } catch (error) {
        // Handle errors here
        console.error('Error in send messages:', error);
        res.status(500).send('Error in send messages');
    }
}

const getMessages = async (req, res, next) => {
    // console.log('=====request', req)
    // console.log('=====request', req.userDetail._id)
    try {
        const { sender, recipients } = req.body;

        if (!sender && !recipients) {
            return res.status(404).send({ success: false, message: 'Sender, recipients are required' });
        }

        const messages = await Messages.find({
            $or : [
                {sender: sender, recipients: recipients},
                {sender: recipients, recipients: sender}
            ]
        }).sort({timestamp : -1}).exec();

        if(messages){
            res.status(200).json(messages);
        }
        
    } catch (error) {
        // Handle errors here
        console.error('Error in send messages:', error);
        res.status(500).send('Error in send messages');
    }
}

module.exports = { sendMessages, getMessages };