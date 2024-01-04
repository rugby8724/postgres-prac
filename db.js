// set a configuration for what or where we want
// to connect the database 

const Pool = require("pg").Pool

const pool = new Pool({
  user: "postgres",
  
})