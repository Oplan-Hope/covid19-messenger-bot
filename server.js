const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')

require('dotenv').config()
require('isomorphic-unfetch')

const index = require('routes/index')
const webhooks = require('routes/webhook')

const app = express()

/**
 * Configurations
 */
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 8000)

/**
 * Static assets
 */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

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
