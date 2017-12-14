const mysql = require('mysql2/promise');
const path = require('path');
const config = require(path.resolve(__dirname, "../config.json"));
var SQL = null;


module.exports = {
    async init() {
        SQL = await mysql.createConnection({
            host: config.database.hostIP,
            user: config.database.user,
            password: config.database.pass,
            database: config.database.db
        });
    },

    query(querystr, postmap) { // Database queries
        return SQL.query(querystr, postmap);
    }
}