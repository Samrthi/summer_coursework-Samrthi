const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()
const API = require('./server/routes/API.routes')

mongoose.connect('mongodb+srv://cluster0.7koai.mongodb.net/robertslist?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
    {
        sslKey: process.env.mongoCredentials,
        sslCert: process.env.mongoCredentials,
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


        let port = process.env.PORT;
        if (port == null || port == "") {
            port = 8000;
        }
        app.listen(PORT, () => console.log(`Application started successfully on port: ${port}!`))

    }
})

