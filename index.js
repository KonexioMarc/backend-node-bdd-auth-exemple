const express = require('express');
const app = express();
const port = 3002
const session = require('express-session')
const passport = require('./config/passport')

app.use(express.json())


app.use(session({
    secret: 'MyAwesomeSecret', // string permettant de "signer" nos sessions
    resave: true, // nous permet de garder notre session toujours a jour
    saveUninitialized: false // nous permet de sauvegarder notre session
}))

app.use(passport.initialize())
app.use(passport.session())

app.post('/login', passport.authenticate('local'), function(req, res, next){
    if (!req.user) {
        res.status(401).send('The username password is not correct')
    }
    res.send('Hello ' + req.user.username)
})


app.listen(port, () => {
    console.log('The server is started at', port)
})