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

const md5 = require('md5')
const jwt = require('jsonwebtoken')
let config = require('config')
const userModule = require('../../modules/user').default


config = config.get('JwtToken')

const { jsonResponse } = require('../logger')


module.exports = {
    /**
     * Login User
     *
     * @memberOf frontend.user
     */
    index: async (req, res) => {
        jsonResponse(res, 'success', {
            responseType: 2,
            message: 'Index Route',
        })
    },

}
