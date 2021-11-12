const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ec",
  password: "ec",
  host: "localhost",
  port: 5432,
  database: "electoral_db"
});

module.exports = pool;