const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userRouter = require('./src/routes/users');
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
                const user = await users_model.findOne({ _id: token.user._id, isActive : true, isDeleted : false }); // Use the email from the token
                // console.log('====user from token', user)
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

const tokenAuth = passport.authenticate('jwt', { session: false })

// Define your routes here
router.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});
router.use("/auth", authRouter);
router.use('/users', tokenAuth, userRouter);





module.exports = router;