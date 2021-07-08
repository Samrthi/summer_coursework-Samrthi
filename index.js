const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const fs = require('fs');

const app = express()
const API = require('./server/routes/API')



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
        app.use(express.static(path.join(__dirname, 'dist')))

        // middleware
        app.use('/', function (req, res, next) {
            // • Implement your logic here.
            console.log('Time:', Date.now())
            next()
        })

        // API handler
        app.use(`/api/`, API)

        // Return error on undeclared paths
        app.get('/api/*', (req, res) => {
            res.send({
                message: 'Endpoint not found',
                type: 'error'
            })
        })


        app.get('*', (req, res) => {
            console.log(req.url)
            res.sendFile(path.join(__dirname, 'dist/app/index.html'))
        })

        const PORT = 3000
        app.listen(PORT, () => console.log(`Application started successfully on port: ${PORT}!`))

    }
})

