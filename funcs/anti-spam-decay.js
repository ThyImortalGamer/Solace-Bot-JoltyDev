const path = require('path');
const database = require(path.resolve(__dirname, "./database.js"));

module.exports = {
    async run() {
        await database.query(`SELECT * FROM spamScores`, [], async (err, rows, fields) => {
            if(!rows) return;
            for (let i = 0; i < rows.length; i++) {
                await database.query(`UPDATE spamScores SET points = ${rows[i].points > 0 ? rows[i].points - 1 : rows[i].points} WHERE userId = ${rows[i].userId}`, [], (err, rows, fields)=>{
                    if(err) return console.log("Error on antispam-decay:\n"+err)
                })
            }
        })
    }
}