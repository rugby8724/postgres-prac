// set a configuration for what or where we want
// to connect the database 

const {Pool} = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const password = (process.env.POSTGES_ACCESS)

const pool = new Pool({
  user: "postgres",
  password: password,
  database: "todo_database",
  host: "localhost",
  port: 5432
})

module.exports = pool