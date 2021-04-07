/* ============================================================================ *\
|| ########################################################################## ||
|| # Auction Software Marketplace          Release: 0.6   Build 0.7         # ||
|| # ---------------------------------------------------------------------- # ||
|| # License # 35YAHCNR9344X6O666C123AB                                     # ||
|| # ---------------------------------------------------------------------- # ||
|| # Copyright ©2014–2021 Develop Scripts LLC. All Rights Reserved          # ||
|| # This file may not be redistributed in whole or significant part.       # ||
|| # ------------- AUCTION SOFTWARE IS NOT FREE SOFTWARE ------------------ # ||
|| # http://www.auctionsoftwaremarketplace.com|support@auctionsoftware.com  # ||
|| # ---------------------------------------------------------------------- # ||
|| ########################################################################## ||
\* ============================================================================ */

const express = require('express')
const config = require('config').get('JwtToken')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const index = require('./routes/index')

// const { CustomStatusError } = require('../../middleware/custom_error')
// const checkIPValidation = require('../../middleware/ip_whitelist');
const { jsonResponse } = require('./controllers/logger')
// const checkip = new checkIPValidation();
const app = express.Router()

const logDirect = path.join(__dirname, '../../../../public/logs/api/error')

if (!fs.existsSync(logDirect)) {
    fs.mkdirSync(logDirect)
}



const NotAuthenticated = async (req, res, next) => {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        try {
            const decoded = await jwt.verify(bearerToken, config.get('secret'))
            req.token = bearerToken
            req.user = decoded
            return next()
        } catch (err) {
            console.log('login error', err)
            jsonResponse(res, 'error', {
                responseType: 403,
                message: 'Session timed out!',
            })
            return false
        }
    } else {
        return next()
    }
}

const Authenticated = async (req, res, next) => {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        try {
            const decoded = await jwt.verify(bearerToken, config.get('secret'))
            req.token = bearerToken
            req.user = decoded
            return next()
        } catch (err) {
            console.log('login error', err)
            jsonResponse(res, 'error', {
                responseType: 403,
                message: 'Session timed out!',
            })
            return false
        }
    }  else {
        jsonResponse(res, 'error', {
            responseType: 403,
            message: 'No Bearer Token Available!',
        })
        return false
    }
}

/**
 * Operations for Frontend.
 *
 * @namespace frontend
 */

app.use('/', NotAuthenticated, index)

module.exports = app
