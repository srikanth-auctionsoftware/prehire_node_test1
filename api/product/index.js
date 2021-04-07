const express = require('express')
const v1 = require('./v1')

const app = express.Router()

app.use(['/', '/v1'], v1)

module.exports = app