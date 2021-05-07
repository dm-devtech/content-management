require('dotenv').config()
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: isProduction ? "cms_db" : "cms_db_test",
  host: "localhost",
  port: 5432,
})

module.exports = pool;
