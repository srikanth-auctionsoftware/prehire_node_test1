const http = require('http')
const socketIO = require('socket.io')

const port = require('config').get('Common').get('port')

exports.default = async (app) => {
    const server = http.createServer(app).listen(8080)
    server.setTimeout(540000)
    console.log(`site up and running on port: ${port}`)
    // http.globalAgent.maxSockets = 10;

    global.io = socketIO(server)

    setInterval(() => {
        global.io.sockets.emit('servertime', { dTime: new Date() })
    }, 1000)

    return app
}
