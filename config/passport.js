const passport = require("passport");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../model/user");

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
        // Check if the JWT is blacklisted

        const user = await User.findById(jwt_payload._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'User not found' });
        }
    } catch (error) {
        return done(error, false);
    }
}));

module.exports = passport;
