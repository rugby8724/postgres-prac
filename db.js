// set a configuration for what or where we want
// to connect the database 

import pg from 'pg'
const {Pool} = pg;

const password = process.env.POSTGES_ACCESS

const pool = new Pool({
  user: "postgres",
  password: password,
  database: "todo_database",
  host: "localhost",
  port: 5432
})

export default pool;