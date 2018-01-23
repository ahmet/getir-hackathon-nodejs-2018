'use strict'

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const connectToDB = require('./database')

// Constants
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

// Controllers
const recordSearchCtrl = require('./controllers/record/search')

// Database
connectToDB()

// App
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('common'))
app.use(compression())

// Don't serve favicon
app.get('/favicon.ico', function (req, res) {
  res.status(204)
})

// Routes
app.post('/searchRecord', recordSearchCtrl)

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)