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
const front = require('./front')

const app = express.Router()

app.use(['/', '/front'], front)

module.exports = app
