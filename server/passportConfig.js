import User from "./models.js";
import bcrypt from "bcrypt";
import localStrategy from "passport-local";

export default (passport) => {
    passport.use(
        new localStrategy(function verify(username, password, cb) {
            User.findOne({ username: username })
                .then((user) => {
                    if (!user) {
                        return cb(null, false);
                    }

                    bcrypt.compare(password, user.password).then((result) => {
                        if (result) {
                            return cb(null, user);
                        } else {
                            return cb(null, false);
                        }
                    });
                })
                .catch((err) => console.log(err));
        })
    );

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, { id: user.id });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
};
