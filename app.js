/* ============================================================================ *\
|| ########################################################################## ||
|| # Auction Software Marketplace[*]version[*] Build [*]build[*]            # ||
|| # ---------------------------------------------------------------------- # ||
|| # Customer License # [*]license[*]                                       # ||
|| # ---------------------------------------------------------------------- # ||
|| # Copyright ©2014–[*]year[*] Develop Scripts LLC. All Rights Reserved    # ||
|| # This file may not be redistributed in whole or significant part.       # ||
|| # ------------- AUCTION SOFTWARE IS NOT FREE SOFTWARE ------------------ # ||
|| # http://www.auctionsoftwaremarketplace.com|support@auctionsoftware.com  # ||
|| # ---------------------------------------------------------------------- # ||
|| ########################################################################## ||
\* ============================================================================ */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const express = require('express')
const loaders = require('./loaders')

const startServer = async () => {
    const app = express()
    await loaders(app)
}

startServer()
