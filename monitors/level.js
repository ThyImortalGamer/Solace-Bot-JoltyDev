const {
    Monitor
} = require('klasa');
const path = require('path');
const database = require(path.resolve(__dirname, "../funcs/database.js"))
const fullmember = '383768374485712896'
module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false
        });
    }

    async run(msg) {
        // This is where you place the code you want to run for your monitor
        if (msg.guild && msg.member.roles.has(fullmember)) {

            const [rows, fields] = await database.query(`SELECT * FROM profiles WHERE userId =${msg.author.id}`, [])
                if (rows.length < 1) {
                    database.query("REPLACE INTO profiles (userId, username, points, level, credits, colour, discipline) VALUES (?, ?, ?, ?, ?, ?, ?)", [msg.author.id, msg.member.displayName, 1, 1, 100, '0x673AB7', 'No']);
                }
                rows.forEach(row => {
                    const msgarray = [`Hey <@${msg.author.id}>! You have leveled up - your new level is: **${row.level + 1}**. Well done!`, `<@${msg.author.id}>, GG! You've leveled up from **${row.level}** to **${row.level + 1}**!`, `Everyone! Listen! <@${msg.author.id}> has just reached **${row.level + 1}**! Round of applause!`, `<@${msg.author.id}> is coming out of their cage, and they are doing just fine! Gotta gotta be great because they leveled up! New level: **${row.level + 1}**.`, `Well its that time again... <@${msg.author.id}> you have leveled up! You was level **${row.level}** but now you are **${row.level + 1}**.. *sniffles...* THEY GROW UP SO FAST ):`]
                    let message = msgarray[Math.floor(Math.random() * msgarray.length)];
                    let neededPoints = row.level * row.level * 25;
                    if (row.points >= neededPoints - 1) {
                        database.query(`UPDATE profiles SET points = ?, level = ?, credits = ? WHERE userId = ${msg.author.id}`, [row.points = 0, row.level += 1, row.credits += 100]);
                        this.genChannel.send(`${message}`);
                    }
                    if (row.discipline == 'No') {
                        database.query(`REPLACE INTO profiles (userId, username, points, level, credits, colour, discipline) VALUES (?, ?, ?, ?, ?, ?, ?)`, [row.userId, row.username, row.points + 2, row.level, row.credits + 10, row.colour, row.discipline]);
                    } else if (row.discipline == 'Yes') {
                        database.query(`REPLACE INTO profiles (userId, username, points, level, credits, colour, discipline) VALUES (?, ?, ?, ?, ?, ?, ?)`, [row.userId, row.username, row.points + 1, row.level, row.credits + 5, row.colour, row.discipline]);
                    }
                })
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
        this.genChannel = this.client.channels.get('383660119218585602')
        database.query("CREATE TABLE IF NOT EXISTS profiles (userId VARCHAR(19) PRIMARY KEY, username TEXT, points INT, level INT, credits INT, colour TEXT, discipline TEXT)", [], (err, rows, fields) => {
            if (err) console.log(err);
        })
    }

};