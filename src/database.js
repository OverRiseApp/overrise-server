const DBInfo = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  // Indicate the time is stored in UTC
  timezone: 'Z',
  charset: 'utf8',
}
exports.DBInfo = DBInfo

const knexFile = {
  client: 'pg',
  connection: DBInfo,
}
exports.knexFile = knexFile

exports.knex = require('knex')(knexFile)
