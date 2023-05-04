const mysql = require("mysql");

function newConn() {
  return (conn = mysql.createConnection({
    host: "capstone-db-instance.cztzgmdpy7ua.us-east-2.rds.amazonaws.com",
    port: "3315",
    user: "admin",
    password: "admin-password",
    database: "parcadeDB",
  }));
}

module.exports = newConn;
