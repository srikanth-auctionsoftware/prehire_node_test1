// const https = require('https');
const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const csrf = require('csurf')

module.exports = async (app) => {

    app.use(helmet())
    app.use(compression())
    app.use(express.static(path.join(__dirname, '../public')))
    csrf({ cookie: true })

    app.use(cors())

    process
        .on('uncaughtException', (err) => {
            console.log(`exception error==${err}`)
            process.exit(1)
        })
        .on('unhandledRejection', (err) => {
            console.log(`rejection error==${err}`)
            process.exit(1)
        })

    return app
}
