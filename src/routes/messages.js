const express = require('express');
const messagesRouter = express.Router();
const {requestInterceptor, checkSessions} = require('./../middelware/interceptor');
//controllers
const {sendMessages} = require('./../controllers/messages_controllers')


messagesRouter.post("/sendMessage", sendMessages);

module.exports = messagesRouter ;