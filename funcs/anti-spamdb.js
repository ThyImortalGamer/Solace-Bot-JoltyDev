
const path = require('path');
const staffrole = '383664307243712515';
const database = require(path.resolve(__dirname, "./database.js"));

module.exports = {

    async run(msg) {
        

        if (msg.author.bot) return;

        await database.query(`SELECT * FROM spamScores WHERE userId ="${msg.author.id}"`, [], async (err, rows, fields) => {
            if (rows < 1) {
                await database.query("REPLACE INTO spamScores (userId, points) VALUES (?, ?)", [msg.author.id, 1], (err, rows, fields) => {
                    if (err) return console.log("Error on replace into spamScores:\n"+err)
                });
            } else {
                rows.forEach(async row => {
                    await database.query(`UPDATE spamScores SET points = ${row.points + 1} WHERE userId = ${msg.author.id}`);
                    
                    if(msg.channel.parentId == '384425107810025472') return;
                    
                    if (row.points > 15&&msg.channel.parentId != '384425107810025472') {
                        msg.seeecret = true;
                        msg.client.commands.get('antispammute').run(msg, [msg.member, 'Anti-Spam mute'])
                    } else if (row.points > 10&&row.points%2==0) {
                        msg.reply('SLOW DOWN YOU\'RE SPAMMING')
                    };
                });
            }
        })

    },

    async init() {
        await database.query("CREATE TABLE IF NOT EXISTS spamScores (userId VARCHAR(19) PRIMARY KEY, points INTEGER)", [], (err, rows, fields) => {
            if(err) return console.log("Error at spamScore table creation:\n"+err)
        })
    }

}