const mysql = require('mysql')
const util = require('util')
const config = require('config').get('Common').get('dbConfig')

module.exports = async () => {
    global.dbconfig = {
        connectionLimit: 120,
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
    }

    const handleDisconnect = () => {
        global.connect = mysql.createPool(global.dbconfig)
        global.connect.getConnection((err, connection) => {
            if (err) {
                console.log('mySQLPool Error', err, err.message)
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                    handleDisconnect()
                } else if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                } else if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                    handleDisconnect()
                } else if (err.code === 'ETIMEDOUT') {
                    console.error('Database Error Timed out')
                    handleDisconnect()
                } else {
                    console.error('Database Error Unknown', err)
                }
            }
            if (connection) connection.release()
        })
        global.connect.query = util.promisify(global.connect.query)
        global.mysql = global.connect
    }
    handleDisconnect()

    global.dbconfigsingle = {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
    }
    const handleDisconnectSingle = () => {
        global.connectsingle = mysql.createConnection(global.dbconfigsingle)

        global.connectsingle.connect((err) => {
            if (err) {
                if (err === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                    handleDisconnect()
                } else if (err === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                } else if (err === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                    handleDisconnect()
                } else if (err === 'ETIMEDOUT') {
                    console.error('Database Error Timed out')
                    handleDisconnect()
                } else {
                    console.error('Database Error Unknown', err)
                }
            }
        })
        global.connectsingle.on('close', () => {
            handleDisconnectSingle()
        })
        global.connectsingle.on('end', () => {
            handleDisconnectSingle()
        })
        global.connectsingle.on('error', (err) => {
            if (err.fatal || err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error(`[${new Date()}] --> DB FATAL/PROTOCOL_CONNECTION_LOST ERROR :`, err)
                global.connectsingle.end()
            }
        })
        global.connectsingle.query = util.promisify(global.connectsingle.query)
        global.mysqlsingle = global.connectsingle
    }
    handleDisconnectSingle()

    // #### mysql slave
    /* global.database1 = config['database1'];
    global.dbconfig1 = {
                          host : global.database1.host,
                          user : global.database1.user,
                          password: global.database1.password,
                        };
    function handleDisconnect1()
    {
      global.connect = mysql.createConnection(global.dbconfig1);
      global.connect.connect();
      global.connect.query('use '+global.database1.database);
      global.connect.on('close', function (err) {
        handleDisconnect1();
      });
      global.connect.on('end', function (err) {
        handleDisconnect1();
      });
      global.connect.on('error', function(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
          handleDisconnect1();
        }
        else {
          console.log(err);
        }
      });
      global.mysql_slave = global.connect;
    }
    handleDisconnect1(); */
    return global
}
