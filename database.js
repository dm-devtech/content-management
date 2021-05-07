require('dotenv').config()

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: "cms_db",
  host: "localhost",
  port: 5432
})

module.exports = pool;
