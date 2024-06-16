const validator = require('express-validator');
const users = require('./../models/users_model');

const getUsers = async (req, res, next) => {
    // console.log('=====request', req)
    // console.log('=====request', req.userDetail._id)
    try {
        const userDetail = req.userDetail;
        const result = await users.find({
            _id : userDetail._id,
            isActive: true,
            isDeleted : false
        }).exec();
        // console.log('sent user details', result);
        res.send(result);
    } catch (error) {
        // Handle errors here
        console.error('Error fetching user details:', error);
        res.status(500).send('Error fetching user details');
    }
}

module.exports = { getUsers };
