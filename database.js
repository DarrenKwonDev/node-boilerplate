const mysql = require("mysql");
const dotenv = require("dotenv").config();
const util = require("util");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// database
const pool = mysql.createPool({
  connectionLimit: 5000,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  multipleStatements: true,
});

pool.getConnection((err, connection) => {
  if (err) {
    switch (err.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("Database connection was closed.");
        break;
      case "ER_CON_COUNT_ERROR":
        console.error("Database has too many connections.");
        break;
      case "ECONNREFUSED":
        console.error("Database connection was refused.");
        break;
    }
  }
  if (connection) {
    console.log("✔ db connection done!");
    return connection.release();
  }
});

pool.query = util.promisify(pool.query);
// util.promisify으로 감싸기
// pool.query.then(data => ...)

pool.getConnection = util.promisify(pool.getConnection);
// util.promisify으로 감싸기
// pool.getConnection.then(data => ...)

module.exports = pool;
