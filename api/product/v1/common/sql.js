const _ = require('underscore')
const dateFormat = require('dateformat')
const moment = require('moment')

class CommonModule {
    static removeFromArray(array, value) {
        return array.filter((e) => {
            return !_.contains(value, e)
        })
    }

    static sqlReplace(data, row) {
        let rowChange = row
        Object.keys(data).forEach((key) => {
            rowChange = rowChange.replace(new RegExp(`{{${key}}}`, 'g'), data[key])
        })
        return rowChange
    }

    static InsertSQLFunction(dynamicValues, acceptedKeysInside, defaultKeys, defaultValues) {
        const returnJSON = {}
        const defaultKeysInside = defaultKeys || []
        const defaultValuesInside = defaultValues || []
        const dynamicValuesFiltered = _.omit(dynamicValues, (value, key, object) => {
            if (
                _.isNull(value) ||
                _.isUndefined(value) ||
                value === '' ||
                !_.contains(acceptedKeysInside, key)
            ) {
                return true
            }
            return false
        })
        const values = _.map(_.values(dynamicValuesFiltered), (val) => {
            let dataReturn
            if (val instanceof Array) {
                dataReturn = val.toString()
            } else {
                dataReturn = val
            }
            return dataReturn
        })
        /* const skippedDefaultValues = _.map(_.values(defaultValuesInside), (val) => {
            let dataReturn
            if(!_.indexOf(dynamicValues, val)) {
                console.log("Inside the loop", val)
                return dataReturn
            }else {
                console.log("else cond ", val)
            }
        }) */

        returnJSON.keys = defaultKeysInside.concat(_.keys(dynamicValuesFiltered))
        returnJSON.escapeData = defaultValuesInside.concat(values)
        // returnJSON.escapeData = skippedDefaultValues.concat(values)
        const insertarray = Array(returnJSON.escapeData.length - 1).fill('?,')
        returnJSON.values = insertarray.concat('?').join('')
        return returnJSON
    }

    static updateSQLFunction(dynamicValues, acceptedKeys, defaultKeys, defaultValues) {
        const returnJSON = {}
        const defaultKeysInside = defaultKeys || []
        const defaultValuesInside = defaultValues || []
        const acceptedKeysInside = acceptedKeys || []
        const dynamicValuesFiltered = _.omit(dynamicValues, (value, key, object) => {
            if (_.isNull(value) || _.isUndefined(value) || !_.contains(acceptedKeysInside, key)) {
                return true
            }
            return false
        })
        const values = _.map(_.values(dynamicValuesFiltered), (val) => {
            let dataReturn
            if (val instanceof Array) {
                dataReturn = val.toString()
            } else {
                dataReturn = val
            }
            return dataReturn
        })
        const keyswithescape = defaultKeysInside.concat(_.keys(dynamicValuesFiltered))
        returnJSON.escapeData = defaultValuesInside.concat(values)
        returnJSON.keys = _.map(keyswithescape, (val) => {
            return `${val} = ?`
        })
        return returnJSON
    }

    static dateTimeFormatConvert(date) {
        const dataReturn = dateFormat(
            new Date(moment(date, global.configurations.variables.date_time_format).format()),
            'yyyy-mm-dd HH:MM:ss',
        )
        return dataReturn
    }

    static dateTimeConvert(date) {
        const dataReturn = dateFormat(new Date(date), 'yyyy-mm-dd HH:MM:ss')
        return dataReturn
    }
}

module.exports.default = CommonModule
