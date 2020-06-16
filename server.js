require('dotenv-safe').config()
const express = require("express")
const routes = require('./app/routes');
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
const initMongo = require('./config/mongo')
const app = express()
const path = require('path')

// Configure cloudinary
cloudinary.config({
  cloud_name: 'ladybug',
  api_key: '',
  api_secret: ''
})

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000)

// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)

// Initialize all other stuff
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(cors())
app.use(helmet())
app.use(routes)
app.listen(app.get('port'))

// Init MongoDB
initMongo()
