const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../modules/user');
const config = require('../config/database');

module.exports = (passport) => {
    let opts = {};
    console.log(ExtractJwt)
    opts.jwtFromRequest = ExtractJwt.fromHeader();
    opts.secretOrKey =config.secret;
    passport.use(new JwtStrategy(opts, (jwtPayoload, done) => {
        User.getUserById(jwtPayoload._id, (err, foundUser) => {
            if(err) {
                return done(err, false);
            }

            if(user) {
                return done(null, foundUser)
            } else {
                return done(null, false);
            }
        });
    }))
}