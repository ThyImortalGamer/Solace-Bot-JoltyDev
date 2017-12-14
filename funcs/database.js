const mysql = require('mysql2');
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

    async query(querystr, postmap, callback) { // Database queries
        try {
            await SQL.query(querystr, postmap, callback);
        } catch (err) {
            console.log("Error: " + err)
        }
    }
}