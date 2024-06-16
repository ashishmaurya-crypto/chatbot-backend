const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { findMissingFields } = require('../services/Helpers')
// const { requestInterceptor, checkSessions } = require('../middelware/interceptor')

//controllers
require('../controllers/login_controllers')
require('./../controllers/signup_controllers');




const signupStrategy = passport.authenticate('signup', { session: false });

const loginStrategy = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    // const error = new Error('An error occurred.');
                    // console.log('error=====', err, user, info)
                    return res.status(500).json({ success: false, ...info });
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return res.status(500).json({ success: false, error });

                        const body = { _id: user._id, email: user.email };
                        const token = jwt.sign({ user: body }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 });

                        return res.status(200).json({ success: true, message: 'user login successfully', token });
                    }
                );
            } catch (error) {
                return res.status(500).json({ success: false, error });
            }
        }
    )(req, res, next);
}

const fieldValidation = (req, res, next) => {
    const allfields = ['userName', 'email', 'password', 'confirmPassword', 'phoneNumber', 'age', 'gender', 'country', 'state', 'city']
    const missingFields = findMissingFields(allfields, req.body);

    if (missingFields.isMissing) {
        return res.status(500).json({ success: false, error: `${missingFields.fields.join(', ')} is required` });
    }

    if (missingFields.error) {
        return res.status(500).json({ success: false, error: missingFields.error });
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(500).json( { success: false, error: 'password and confirm Password is not matched.' });
    }

    next();
}

authRouter.post('/login', loginStrategy);

authRouter.post("/signup", fieldValidation, signupStrategy,
    async (req, res, next) => {
        if (req.user.success) {
            res.status(200).json(req.user)
        } else {
            res.status(500).json(req.user)
        }

    })


module.exports = authRouter;