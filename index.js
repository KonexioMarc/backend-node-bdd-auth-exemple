const express = require('express');
const app = express();
const port = 3002
const session = require('express-session')
const passport = require('./config/passport')
const cors = require('cors');
const UserModel = require('./models/users');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost:27017/login')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
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
    res.json({message: 'ok'})
})

app.post('/signup', async function(req, res, next) {
    // try {
    //     const body = req.body;
    //     console.log('body', body)
    //     const hash = await bcrypt.hash(body.password, 10)
    //     body.password = hash
    //     UserModel.create(body)
    //         .then(user => res.json(user))

    // } catch(err) {
    //     console.error(err)
    // }

    const body = req.body;
    console.log('body', body)
    bcrypt.hash(body.password, 10)
        .then(hash => {            
            body.password = hash
            UserModel.create(body)
                .then(user => res.json(user))
        })
})

const checkAuth = (req, res, next) => {
    console.log(req.isAuthenticated())
    console.log(req.user)
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(403).send('You need to be authenticated')
    }
}

app.get('/users', checkAuth, (req, res, next) => {

    UserModel.find()
        .exec()
        .then(users => res.json(users))
})


app.listen(port, () => {
    console.log('The server is started at', port)
})