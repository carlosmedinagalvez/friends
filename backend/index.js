//const express = require('express')
import express from 'express'
//const cors = require('cors')
import cors from 'cors'
//const bodyParser = require('body-parser')
import bodyParser from 'body-parser'
//const router = require('./routers/router')
import router from './routers/router.js'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    };

});*/

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/',router)
app.use(express.json())

const port=4000
const server = app.listen(port, () => {
    console.log(`running on ${port}`)
})

//module.exports = index