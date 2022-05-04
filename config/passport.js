const passport = require('passport')
const LocalStrategy = require('passport-local')

const users = [{
        _id: '1',
        username: 'toto',
        password: 'supercoolpassword'
    },
    {
        _id: '2',
        username: 'tata',
        password: 'apassword123'
    }
]

passport.use(new LocalStrategy(function (username, password, done) {
    console.log("username", username)
    console.log("password", password)
    const user = users.find(user => user.username === username)
    if (!user) {
        return done(null, false)
    }

    if (user.password !== password) {
        return done(null, false)
    }

    done(null, user)

}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((_id, done) => {
    const user = users.find(user => user._id === _id)
    done(null, user)
})

module.exports = passport;