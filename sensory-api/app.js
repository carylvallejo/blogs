const express = require('express')
const app = express()
const cors = require('cors')
const statsRouter = require('./controllers/stats')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/Article_Stats', statsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app