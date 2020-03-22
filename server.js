const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
require('isomorphic-unfetch')

const index = require('./routes/index')
const webhooks = require('./routes/webhook')

const app = express()

/**
 * Configurations
 */
app.set('port', process.env.PORT || 8000)

/**
 * Parsers
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Routes
 */
app.use('/', index)
app.use('/webhook', webhooks)

/**
 * Here we go...
 */
app.listen(app.get('port'), () => {
  console.log(`Hope is listening on port ${app.get('port')}!`)
})

module.exports = app
