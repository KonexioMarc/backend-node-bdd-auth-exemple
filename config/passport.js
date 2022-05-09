const passport = require('passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../models/users')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy( {
    usernameField: "email",
    password: "password"
},async function (email, password, done) {
    try {
        console.log("email", email)
        console.log("password", password)
        const user = await UserModel.findOne({
            email
        });
        if (!user) {
            return done(null, false)
        }
        const isSame = await bcrypt.compare(password, user.password);
        if (!isSame) {
            return done(null, false)
        }
    
        done(null, user)

    } catch(err) {
        console.error(err)
        done(null, false)
    }

}))

passport.serializeUser((user, done) => {
    console.log('serializeUser user', user)
    done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
    try {
        console.log('deserialize user', _id)
        const user = await UserModel.findById(_id)
        done(null, user)
    } catch(err) {
        console.error(err);
        done(null, false)
    }
})

module.exports = passport;