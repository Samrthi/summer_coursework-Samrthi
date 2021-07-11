const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const fs = require('fs');
var cookieParser = require('cookie-parser')

const app = express()
const API = require('./server/routes/API.routes')

const credentials = fs.readFileSync('X509-cert-6199649518536865681.pem');

mongoose.connect('mongodb+srv://cluster0.7koai.mongodb.net/robertslist?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
    {
        sslKey: credentials,
        sslCert: credentials,
        authMechanism: 'MONGODB-X509',
        authSource: '$external'
    },
    (err) => {
    if (err) {
        console.log(err)
    } else {
        // cookie decoder, saves some hassle
        app.use(cookieParser())

        // API handler
        app.use('/api/', API)

        // Return error on undeclared API paths
        app.get('/api/*', (req, res) => {
            res.status(404).send()
        })


        // let angular handle rest of routes
        app.use(express.static(path.join(__dirname, 'dist/app')))
        app.get('*', (req, res) => {
            console.log(req.url)
            res.sendFile(path.join(__dirname, 'dist/app/index.html'))
        })

        const PORT = 3000
        app.listen(PORT, () => console.log(`Application started successfully on port: ${PORT}!`))

    }
})

