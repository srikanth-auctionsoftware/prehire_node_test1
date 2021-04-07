const express = require('express')
const product = require('./product')

const app = express.Router()

app.use(['/'], product)
module.exports = app
