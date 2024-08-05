const express = require('express');
const userRouter = express.Router();
const {requestInterceptor, checkSessions} = require('./../middelware/interceptor')
//controllers
const {getUserDetail, allUsers, updateContactlist, getContactList} = require('./../controllers/user_controllers')


//middleware
// userRouter.use(checkSessions);
// userRouter.use(requestInterceptor);

userRouter.post("/detail", getUserDetail);
userRouter.post("/allUsers", allUsers);
userRouter.post("/get_contact_list", getContactList);
userRouter.post("/update_contact_list", updateContactlist);


module.exports = userRouter ;