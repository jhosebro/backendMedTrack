const mysql = require('mysql');

const db = mysql.createConnection({
    host: "db4free.net",
    user: "jhosebro",
    password: "Gogeta123,",
    database: "medtrack",
  });

module.exports = db;