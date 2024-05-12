const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users_model = require('./../models/users_model');
const {isValidEmail, isValidPhoneNumber} = require('./../services/functions')



passport.use('login', new LocalStrategy(
    {
        usernameField: 'username', // Use 'identifier' to accept both email and phone number
        passwordField: 'password',
    },
    async (username, password, done) => {
        try {
            const isEmail = isValidEmail((username.toString()));
            const isPhoneNumber = isValidPhoneNumber((username).toString());

            if (!isEmail && !isPhoneNumber) {
                return done(null, false, { success: false, error: 'Invalid email or phone number' });
            }

            const user = isEmail
                ? await users_model.findOne({ email: username, isActive : true, isDeleted : false })
                : await users_model.findOne({ phoneNumber: username, isactive : true, isDeleted : false });

            // const user = await users_model.findOne({email : username});

            // console.log('db-user', user)
            if(!user){
                return done(null, false, { success: false, error: 'User not found' })
            }
            const validate = await user.isValidPassword(password);
            if(!validate){
                return done(null, false, { success: false, error: 'Wrong Password'})
            }
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (err) {
            done(err);
        }
    }
))
// const login = async (req, res, next) => {
//     console.log('sent login details', req.body);
//     const {email, password} =  req.body
//     try {
//         const user = await users.findOne({ email });

//         if (!user) {
//             return res.send({ statusCode: 404, message: 'incorrect email address' })
//         }

//         const isPasswordValid = await users.findOne({ password });

//         if (!isPasswordValid) {
//             return res.send({ statusCode: 404, message: 'Incorrect username or password.' });
//         }

//         return res.send({statusCode: 200, user});
//     } catch (err) {
//         return res.send(err);
//     }
// }

// module.exports = { login };