const express = require('express');
const messagesRouter = express.Router();
const {requestInterceptor, checkSessions} = require('./../middelware/interceptor');
//controllers
const {sendMessages, getMessages} = require('./../controllers/messages_controllers')


messagesRouter.post("/sendMessage", sendMessages);
messagesRouter.post("/getMessage", getMessages);

module.exports = messagesRouter ;