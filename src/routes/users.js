const express = require('express');
const userRouter = express.Router();
const {requestInterceptor, checkSessions} = require('./../middelware/interceptor')
//controllers
const {getUsers} = require('./../controllers/user_controllers')


//middleware
// userRouter.use(checkSessions);
// userRouter.use(requestInterceptor);

userRouter.get("/detail", getUsers)


module.exports = userRouter ;