
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(express.json())

app.get('/', (req, res) => {
    return res.send('<h1>Hello World</h1>')
})

app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) return res.sendStatus(500)
        // STORE IN DB IN PROD
        res.json({username, hash})
    })


})

app.listen(8980, (error) => {
    if (error) return console.log(`Server failed to start ${error}`)
    console.log("Server is listening")
})