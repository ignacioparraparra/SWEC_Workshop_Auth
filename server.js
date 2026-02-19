// Module imports
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// The greater the number, the harder the password is to crack
const saltRounds = 10

// Lets us send json with express
app.use(express.json())

// Landing Page
app.get('/', (req, res) => {
    return res.send('<h1>Hello World</h1>')
})

// Takes username and password, hashes password and returns username + hash for testing
app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // bcrypt module hash function
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) return res.sendStatus(500)
        // STORE IN DB IN PROD, NEVER STORE PLAIN TEXT PASSWORDS 
        res.json({username, hash})
    })
})

// Takes username and password, compares password to hash in db
// serializes user into payload to sign jwt, returns token
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = {name : username}

    // COMPARE PASSWORD TO THE HASH FROM DB 
    // TODO: Compare req.password to hash in db with bcrypt.compare
    //       If match == True, issue access Token and return it 
    //       Need to inject ACCESS_TOKEN_SECRET from .env 
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
})

app.listen(8980, (error) => {
    if (error) return console.log(`Server failed to start ${error}`)
    console.log("Server is listening")
})