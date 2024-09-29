const validator = require('express-validator');
const users = require('./../models/users_model');
const Group = require('./../models/group_model');
const ContactList = require('./../models/contact_model');
const Messages = require('./../models/messages_model');



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