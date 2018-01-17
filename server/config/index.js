import Mysql from 'mysql2'
const Bluebird = require('bluebird')

const connection = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9liang01108',
  database: 'graphql',
  port: 3306
})

connection.execute = Bluebird.promisify(connection.execute)

module.exports = {
  connection
}