const validator = require('express-validator');
const users = require('./../models/users_model');
const Group = require('./../models/group_model');
const ContactList = require('./../models/contact_model');
const Messages = require('./../models/messages_model');



const sendMessages = async (req, res, next) => {
    // console.log('=====request', req)
    // console.log('=====request', req.userDetail._id)
    try {
        res.send('working for message');
    } catch (error) {
        // Handle errors here
        console.error('Error in send messages:', error);
        res.status(500).send('Error in send messages');
    }
}

module.exports = { sendMessages };