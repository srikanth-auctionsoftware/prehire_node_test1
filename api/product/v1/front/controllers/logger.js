const rfs = require('rotating-file-stream')
const fs = require('fs')
const path = require('path')



module.exports.jsonResponse = (res, status, data) => {
    const finalresultjson = {}
    finalresultjson.status = status
    finalresultjson.data = data
    res.json(finalresultjson)
    res.end()
    return false
}

module.exports.errorResponse = (e, res) => {
    console.error(e)
    this.jsonResponse(res, 'error', {
        responseType: 3,
        message: 'Internal Server error!',
    })
}
