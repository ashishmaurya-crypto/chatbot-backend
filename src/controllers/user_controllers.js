const validator = require('express-validator');
const users = require('./../models/users_model');

const getUsers = async (req, res, next) => {
    // console.log('=====request', req)
    console.log('=====request', req)
    try {
        const result = await users.find({}).exec();
        // console.log('sent user details', result);
        res.send(result);
    } catch (error) {
        // Handle errors here
        console.error('Error fetching user details:', error);
        res.status(500).send('Error fetching user details');
    }
}

module.exports = { getUsers };
