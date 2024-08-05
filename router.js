const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userRouter = require('./src/routes/users');
const messagesRouter = require('./src/routes/messages');
const authRouter = require('./src/routes/auth');
const users_model = require('./src/models/users_model');

// token verification
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromHeader('authorization')
        },
        async (token, done) => {
            try {
                // console.log('====token', token.user)
                const user = await users_model.findOne({ _id: token.user._id, isActive: true, isDeleted: false }); // Use the email from the token
                console.log('====get user from token')
                if (!user) {
                    // console.log('====tokennn--user--call')
                    return done(null, false, { success: false, error: 'User not found' });
                }
                return done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
)

const tokenAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            if (info.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, error: 'Session has expired. Login again please' })
            } else {
                return res.status(401).json(info); // Return the specific error message
            }
        }
        req.userDetail = user;
        next();
    })(req, res, next);
};

// Define your routes here
router.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});
router.use("/auth", authRouter);
router.use('/users', tokenAuth, userRouter);
router.use('/messages', tokenAuth, messagesRouter);






module.exports = router;