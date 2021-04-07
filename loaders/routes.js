module.exports = (app) => {
    const index = require('../api')
    const error = require('../middleware/error')

    app.use(['/'], index)
    app.use(error)

    return app
}
