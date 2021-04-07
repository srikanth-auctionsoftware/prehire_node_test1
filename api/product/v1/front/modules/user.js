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

const dateFormat = require('dateformat')
const md5 = require('md5')
const _ = require('underscore')

const mysqclass = require('./mysqli').default
const commonSQL = require('../../common/sql').default

/**
 * @class class to handle user functions
 */
class userModule {
    /**
     * @param {string} nameID email ID to check in the database.
     * @returns {object} with user details if email exists
     */
    static async checkEmailExisting(nameID) {
        const mysql = {}
        const escapeData = [nameID]
        const strQuery = await mysqclass.mysqli(mysql, 'okta_im_2')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * @param {string} nameID email ID to check in the database.
     * @returns {object} with user details if email exists
     */
    static async loginWithEmail(nameID) {
        const mysql = {
            username: nameID,
        }
        const escapeData = []
        const strQuery = await mysqclass.mysqli(mysql, 'im_2')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * @param {object} req request data
     * @param {string} userId email ID to check in the database.
     * @returns {object} with user details if email exists
     */
    static async updateSocialID(req, userId) {
        const mysql = {}
        const postData = req.body
        const acceptedObjects = ['facebook_id', 'google_id']
        let escapeData = []
        const defaultKeys = ['updated_at']
        const defaultValues = [dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')]
        const valueInsert = commonSQL.updateSQLFunction(
            postData,
            acceptedObjects,
            defaultKeys,
            defaultValues,
        )
        mysql.keys = valueInsert.keys
        escapeData = valueInsert.escapeData
        mysql.user_id = userId
        const strQuery = await mysqclass.mysqli(mysql, 'update_user_profile')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Register User Function
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async registerUser(req, data) {
        const mysql = {}
        let escapeData = []
        const tableUsed = 'users'
        const postData = data
        postData.ip = typeof req.headers.ipaddress === 'undefined' ? '' : req.headers.ipaddress
        if (postData.password) {
            postData.password_salt = '12345'
            postData.password_hash = md5(md5(postData.password) + postData.password_salt)
        }
        postData.status = postData.status ? postData.status : 'active'
        const acceptedObjects = global.configColumns[tableUsed].array_columns
        const defaultKeys = ['created_at', 'created_by']
        const defaultValues = [dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'), '1']
        const valueInsert = commonSQL.InsertSQLFunction(
            postData,
            acceptedObjects,
            defaultKeys,
            defaultValues,
        )
        mysql.keys = valueInsert.keys
        escapeData = valueInsert.escapeData
        mysql.values = valueInsert.values
        const strQuery = await mysqclass.mysqli(mysql, 'insert_users')
        const dataPromise = await global.mysql.query(strQuery, escapeData)
        return dataPromise
    }

    /**
     * Register Custom User Function
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async registerUserCustom(req, data, userID) {
        const mysql = {}
        let escapeData = []
        const tableUsed = 'custom_users'
        const postData = data
        postData.user_id = userID
        const acceptedObjects = global.configColumns[tableUsed].array_columns
        const defaultKeys = []
        const defaultValues = []
        const valueInsert = commonSQL.InsertSQLFunction(
            postData,
            acceptedObjects,
            defaultKeys,
            defaultValues,
        )
        mysql.keys = valueInsert.keys
        escapeData = valueInsert.escapeData
        mysql.values = valueInsert.values
        mysql.table_name = global.configColumns[tableUsed].ext_name
        const strQuery = await mysqclass.mysqli(mysql, 'insert_custom_users')
        const dataPromise = await global.mysql.query(strQuery, escapeData)
        return dataPromise
    }

    /**
     * update User Profile details
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async updateProfile(req) {
        const tableUsed = 'users'
        const mysql = {}
        let escapeData = []
        const postData = req.body
        const acceptedObjects = global.configColumns[tableUsed].array_columns
        const defaultKeys = ['updated_at']
        const defaultValues = [dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')]
        const valueInsert = commonSQL.updateSQLFunction(
            postData,
            acceptedObjects,
            defaultKeys,
            defaultValues,
        )
        mysql.keys = valueInsert.keys
        escapeData = valueInsert.escapeData
        mysql.user_id = req.user.id
        const strQuery = await mysqclass.mysqli(mysql, 'update_user_profile')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Update Custom User Profile details
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async updateCustomUsersProfile(req) {
        const tableUsed = 'custom_users'
        const mysql = {}
        let escapeData = []
        const postData = req.body
        const acceptedObjects = global.configColumns[tableUsed].array_columns
        const defaultKeys = []
        const defaultValues = []
        const valueInsert = commonSQL.updateSQLFunction(
            postData,
            acceptedObjects,
            defaultKeys,
            defaultValues,
        )
        mysql.keys = valueInsert.keys
        escapeData = valueInsert.escapeData
        mysql.user_id = req.user.id
        mysql.table_name = global.configColumns[tableUsed].ext_name
        const strQuery = await mysqclass.mysqli(mysql, 'update_custom_user_profile')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Manually insert notification to the user
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async manualInsertUsernotify(uid) {
        const email =
            typeof global.configurations.variables.default_enabled_user_email_notifications !==
            'undefined'
                ? global.configurations.variables.default_enabled_user_email_notifications
                : '1, 2, 3, 4, 6, 7'
        const sms =
            typeof global.configurations.variables.default_enabled_user_sms_notifications !==
            'undefined'
                ? global.configurations.variables.default_enabled_user_sms_notifications
                : '1, 2, 3, 4, 6, 7'

        const mysql = { email, sms }
        const escapeData = [uid]
        const strQuery = await mysqclass.mysqli(mysql, 'im_35')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Login Process function. Checking the password and salt
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async process(req, callback) {
        const userData = req.body.email.toLowerCase()
        const mysql = {
            username: userData,
        }
        const strQuery = await mysqclass.mysqli(mysql, 'im_2')
        global.mysql.query(strQuery, (error, results, fields) => {
            if (error) {
                callback('')
            }
            if (results.length > 0) {
                const result = results[0]
                if (req.body.google_id) {
                    if (result.google_id === req.body.google_id) {
                        callback(results)
                    } else {
                        callback('')
                    }
                } else if (req.body.facebook_id) {
                    if (result.facebook_id === req.body.facebook_id) {
                        callback(results)
                    } else {
                        callback('')
                    }
                } else if (req.body.password) {
                    result.password = md5(md5(req.body.password) + result.password_salt)
                    if (result.password === result.password_hash) {
                        callback(results)
                    } else {
                        callback('')
                    }
                } else {
                    callback('')
                }
            } else {
                callback('')
            }
        })
    }

    /**
     * Update Last Login date for the user
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async updateLastLogin(uid, rkey) {
        const mysql = {}
        const dateNow = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        const escapeData = [dateNow, rkey, uid]
        const strQuery = await mysqclass.mysqli(mysql, 'im_3')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Add a entry in login table to log users login
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async userViews(req, uid) {
        const mysql = {}
        const userIp = typeof req.headers.ipaddress === 'undefined' ? '' : req.headers.ipaddress
        const userHeader = req.headers['user-agent']
        const dateNow = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss.l')
        const escapeData = [uid, dateNow, userHeader, userIp]
        const strQuery = await mysqclass.mysqli(mysql, 'im_4')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * check if the project is in watch list table for the user
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async isinWatchlist(req, projectID) {
        const mysql = {}
        const uidc = typeof req.user.id === 'undefined' ? 0 : req.user.id
        const escapeData = [uidc, projectID]
        const strQuery = await mysqclass.mysqli(mysql, 'check_watchlist_exist')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * update watchlist to the user and project
     * @param {object} req request data
     * @param {string} projectID project_id to which user requested for watchlist
     * @returns {object} sql response
     */
    static async updateWatchlist(req, projectID) {
        const mysql = {}
        const uidc = typeof req.user.id === 'undefined' ? 0 : req.user.id
        const escapeData = [projectID, uidc]
        const strQuery = await mysqclass.mysqli(mysql, 'update_existing_watchlist')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * add to watchlist for the user and project
     * @param {object} req request data
     * @param {string} projectID project_id to which user requested for watchlist
     * @returns {object} sql response
     */
    static async addWatchlist(req, projectID) {
        const mysql = {}
        const dateNow = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        const uidc = typeof req.user.id === 'undefined' ? 0 : req.user.id
        const escapeData = [projectID, uidc, dateNow]
        const strQuery = await mysqclass.mysqli(mysql, 'insert_new_watchlist')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * remove watchlist for the user and project
     * @param {object} req request data
     * @param {string} projectID project_id to which user requested for watchlist
     * @returns {object} sql response
     */
    static async removeWatchlist(req, projectID) {
        const mysql = {}
        const uidc = typeof req.user.id === 'undefined' ? 0 : req.user.id
        const escapeData = [projectID, uidc]
        const strQuery = await mysqclass.mysqli(mysql, 'delete_from_watchlist')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Check whether user exists or not
     * @param {string} userEmail email id which the user exists or not
     * @returns {object} sql response
     */
    static async checkForgotUserExists(userEmail) {
        const mysql = {}
        const escapeData = [userEmail]
        const strQuery = await mysqclass.mysqli(mysql, 'check_forgot_password_user')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Insert forgot password token
     * @param {object} user user object which the forgot password is requested
     * @param {string} Token Token which is unique for each forgot password request
     * @returns {object} sql response
     */
    static async inserUserToken(user, Token) {
        const mysql = {}
        const dateNow = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        const escapeData = [user.id, user.email, Token, dateNow]
        const strQuery = await mysqclass.mysqli(mysql, 'insert_forgot_password_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * check if the project is in saved search list table for the user
     * @param {object} req request data
     * @param {string} data data is the req.body
     * @returns {object} sql response
     */
    static async isInSavedSearchlist(req, searchText) {
        const mysql = {}
        const uidc = typeof req.user.id === 'undefined' ? 0 : req.user.id
        const escapeData = [uidc, searchText]
        const strQuery = await mysqclass.mysqli(mysql, 'check_saved_search_exist')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * remove saved search for the user
     * @param {object} req request data
     * @param {string} id id to which user requested for saved search
     * @returns {object} sql response
     */
    static async removeSavedSearch(req, id) {
        const mysql = {}
        const uidc = typeof req.user.id === 'undefined' ? 0 : req.user.id
        const escapeData = [id, uidc]
        const strQuery = await mysqclass.mysqli(mysql, 'delete_from_saved_search')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    static async getForgotUserToken(email, token) {
        const mysql = {}
        const escapeData = [email, token]
        const strQuery = await mysqclass.mysqli(mysql, 'get_forgot_password_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Update the reset password request
     * @param {string} password user object which the forgot password is requested
     * @param {object} userExist user object who has request forgot password
     * @returns {object} sql response
     */
    static async updateResetPassword(password, userExist) {
        const mysql = {}
        const passwordSalt = userExist.password_salt
        const passwordHash = md5(md5(password) + passwordSalt)
        const escapeData = [passwordHash, passwordSalt, userExist.id]
        const strQuery = await mysqclass.mysqli(mysql, 'reset_forgot_password')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Update the forgot password token as used
     * @param {object} userExist user object who has request forgot password
     * @returns {object} sql response
     */
    static async updateForgotUserToken(userExist) {
        const mysql = {}
        const dateNow = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        const escapeData = [dateNow, userExist.id]
        const strQuery = await mysqclass.mysqli(mysql, 'update_forgot_password_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Insert phone verification token
     * @param {string} userExist user object who has request forgot password
     * @param {string} token token generated for the phone number verification
     * @param {string} ip ip address of the user's browser
     * @returns {object} sql response
     */
    static async insertPhoneVerifyToken(phone, token, ip) {
        const mysql = {}
        const date = new Date()
        const dateNow = dateFormat(date, 'yyyy-mm-dd HH:MM:ss')
        const minutesaddition =
            parseInt(global.configurations.variables.phone_verify_expiry, 10) * 60000
        const dateExpiry = new Date(date.getTime() + minutesaddition)
        const escapeData = [phone, token, ip, dateNow, dateExpiry]
        const strQuery = await mysqclass.mysqli(mysql, 'insert_phone_verify_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * get phone verification token
     * @param {string} phone Phone number to which the token is to be checked
     * @returns {object} sql response
     */
    static async getPhoneVerifyToken(phone) {
        const mysql = {}
        const escapeData = [phone]
        const strQuery = await mysqclass.mysqli(mysql, 'check_phone_verify_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * update verification token
     * @param {string} id ID of the verification
     * @returns {object} sql response
     */
    static async updatePhoneVerified(id) {
        const mysql = {}
        const dateNow = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        const escapeData = [dateNow, id]
        const strQuery = await mysqclass.mysqli(mysql, 'update_verified_phone_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * update verification token expired
     * @param {string} id ID of the verification
     * @returns {object} sql response
     */
    static async updatePhoneVerifyExpiry(id) {
        const mysql = {}
        const date = new Date()
        const minutesaddition =
            parseInt(global.configurations.variables.phone_verify_expiry, 10) * 60000
        const dateExpiry = new Date(date.getTime() + minutesaddition)
        const escapeData = [dateExpiry, id]
        const strQuery = await mysqclass.mysqli(mysql, 'update_expiry_phone_verify')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Insert email verify token
     * @param {string} userId User ID
     * @param {string} userEmail UserEmail the verify token is generated
     * @param {string} Token Token which is generated
     * @returns {object} sql response
     */
    static async insertEmailVerifyToken(userId, userEmail, Token) {
        const mysql = {}
        const dateNow = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        const escapeData = [userId, userEmail, Token, dateNow]
        const strQuery = await mysqclass.mysqli(mysql, 'insert_register_verify_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Get email verify token
     * @param {string} email email the verify token is generated
     * @param {string} token Token which is generated
     * @returns {object} sql response
     */
    static async getEmailVerifyToken(email, token) {
        const mysql = {}
        const escapeData = [email, token]
        const strQuery = await mysqclass.mysqli(mysql, 'get_register_verify_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Update email verify token as verified
     * @param {string} userExist user Object to which the reset
     * @returns {object} sql response
     */
    static async updateEmailVerified(userExist) {
        const mysql = {}
        const escapeData = [userExist.id]
        const strQuery = await mysqclass.mysqli(mysql, 'reset_register_verify')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Update email verify token as verified and used
     * @param {string} userExist user Object to which the reset
     * @returns {object} sql response
     */
    static async updateEmailVerifiedToken(userExist) {
        const mysql = {}
        const dateNow = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        const escapeData = [dateNow, userExist.id]
        const strQuery = await mysqclass.mysqli(mysql, 'update_register_verify_token')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }


    /**
     * select the User Preference
     * @param {string} userID id for the user which is to be fetched
     * @returns {object} sql response
     */
    static async selectUserPreference(userID) {
        const mysql = {}
        const escapeData = [userID]
        const strQuery = await mysqclass.mysqli(mysql, 'get_preference')
        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Insert the User Preference
     * @param {object} req req object
     * @returns {object} sql response
     */
    static async insertPreference(req) {
        const mysql = {}
        if (req.body.email_prefer instanceof Array) {
            req.body.email_prefer = req.body.email_prefer.toString()
        }
        if (req.body.sms_prefer instanceof Array) {
            req.body.sms_prefer = req.body.sms_prefer.toString()
        }
        const escapeData = [req.user.id, req.body.email_prefer, req.body.sms_prefer]
        const strQuery = await mysqclass.mysqli(mysql, 'insert_preference')

        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    /**
     * Update the User Preference
     * @param {object} req req object
     * @param {string} notifyID notification ID to update
     * @returns {object} sql response
     */
    static async updatePreference(req, notifyID) {
        const mysql = {}
        if (req.body.email_prefer instanceof Array) {
            req.body.email_prefer = req.body.email_prefer.toString()
        }
        if (req.body.sms_prefer instanceof Array) {
            req.body.sms_prefer = req.body.sms_prefer.toString()
        }

        const escapeData = [req.body.email_prefer, req.body.sms_prefer, notifyID]
        const strQuery = await mysqclass.mysqli(mysql, 'update_preference')

        const data = await global.mysql.query(strQuery, escapeData)
        return data
    }

    static async getNotificationFlagdynamic(type) {
        const mysql = {}
        const escapeData = [type]
        const strQuery = await mysqclass.mysqli(mysql, 'remainder_notification_flag_dynamic')
        const dataReturn = await global.mysqlsingle.query(strQuery, escapeData)
        return dataReturn
    }

    static async getparticulartabledetails(data, fieldType, postID, baseTableUsed, limit) {
        const mysqli = {}
        const escapeData = []
        mysqli.keys = data
        mysqli.values = ` ${fieldType}=${postID}`
        mysqli.tables = baseTableUsed
        mysqli.group_by = ''
        mysqli.order_by = ''
        if (limit > 0) {
            mysqli.limit_by = ` limit ${limit}`
        } else {
            mysqli.limit_by = ''
        }
        const strQuery = await mysqclass.mysqli(mysqli, 'select_tables')
        const dataReturn = await global.mysql.query(strQuery, escapeData)
        return dataReturn
    }

    static async commonselectparenttable(data, proid, baseTableUsed, baseid) {
        const mysqli = {}
        const proId = proid.split(',')
        const escapeData = [proId]
        mysqli.keys = data
        mysqli.values = `${baseid} IN (?)`
        mysqli.tables = baseTableUsed.ext_name
        mysqli.group_by = ''
        mysqli.order_by = ''
        mysqli.limit_by = ''
        const strQuery = await mysqclass.mysqli(mysqli, 'select_tables')
        const dataReturn = await global.mysql.query(strQuery, escapeData)
        return dataReturn
    }

    static async postalltypeoflisting(req, data, baseTableUsed) {
        const mysqli = {}
        let escapeData = []
        const postData = data
        const acceptedObjects = baseTableUsed.array_columns
        const defaultKeys = ['created_at', 'updated_at']
        const defaultValues = [
            dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
        ]
        const valueInsert = commonSQL.InsertSQLFunction(
            postData,
            acceptedObjects,
            defaultKeys,
            defaultValues,
        )
        mysqli.keys = valueInsert.keys
        escapeData = valueInsert.escapeData
        mysqli.values = valueInsert.values
        mysqli.tables = baseTableUsed.ext_name
        const strQuery = await mysqclass.mysqli(mysqli, 'insert_tables')
        const dataPromise = await global.mysql.query(strQuery, escapeData)
        return dataPromise
    }

    static async getMultipleAddress(userID) {
        const mysql = {}
        mysql.addressTable = 'user_address_details'
        mysql.userID = userID
        const escapeData = []
        const strQuery = await mysqclass.mysqli(mysql, 'get_user_address_details')
        const dataReturn = await global.mysql.query(strQuery, escapeData)
        return dataReturn
    }

    static async getCardDetails(userID) {
        const mysql = {}
        mysql.addressTable = 'user_card_details'
        mysql.userID = userID
        const escapeData = []
        const strQuery = await mysqclass.mysqli(mysql, 'get_user_card_details')
        const dataReturn = await global.mysql.query(strQuery, escapeData)
        return dataReturn
    }
}

module.exports.default = userModule
