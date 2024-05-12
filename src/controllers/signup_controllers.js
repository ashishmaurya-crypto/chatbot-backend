const users = require("./../models/users_model");
const passport = require('passport');
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy;
// const { findMissingFields } = require('./../services/functions')
//constants
// const allfields = ['userName', 'email', 'password', 'confirmPassword', 'phoneNumber', 'age', 'gender', 'country', 'state', 'city']


passport.use('signup', new localStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      
      const { userName, confirmPassword, phoneNumber, age, gender, country, state, city } = req.body;

      const user = await users.create({...req.body});
      return done(null, { success: true, message: 'user created successfully', user: user });

    } catch (error) {
      
      // Check if the error is a MongoDB duplicate key error
      if (error instanceof mongoose.Error.ValidationError) {
        // Handle Mongoose validation error (e.g., missing required fields)
        done(null, { success: false, error: 'Validation error. Please check your input.' });

      } else if (error.code === 11000 && error.keyPattern && error.keyValue) {
        // Handle MongoDB duplicate key error
        const fieldName = Object.keys(error.keyPattern)[0];
        const duplicatedValue = error.keyValue[fieldName];

        done(null, { success: false, error: `${fieldName} : '${duplicatedValue}' already exists.` });

      } else {
        // Handle other errors
        console.error('Error:', error);
        done(null, { success: false, error: err.message })
      }
    }

  }
))



// const signup = async (req, res, next) => {
//     console.log('body', req.body)
//     const { userName, email, password, phoneNumber, age, gender, state } = req.body;
//     try {
//         if(!userName && !email && !password && !phoneNumber && !age && !gender && !state){
//             return res.status(500).json({error : error.message})
//         }
//         const result = new users({
//             userName,
//             email,
//             password,
//             phoneNumber,
//             age,
//             gender,
//             state
//         });
//         await result.save().then(function (doc) {
//             console.log('successfull', result);
//             res.status(200).json({ success: true, message: "Your account has been saved" });
//         }).catch(function (error) {
//             console.log(error.message);
//             res.status(500).json({success: false, error : error.message})
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// }

// module.exports = signup;

// passport.use('signup', new localStrategy(
//     {
//        usernameField : 'email',
//        passwordField: 'password'
//     }, async (email, password, done) => {
//        try{
//            const user = await users.create({email,password});
//            return done(null, {success: true, user : user});
//        }catch(err){
//            done(null, {success: false, error : err.message});
//        }
//     }
// ))

