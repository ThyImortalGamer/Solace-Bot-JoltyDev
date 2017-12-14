const {
    Command
} = require('klasa');
const path = require('path');
const database = require(path.resolve(__dirname, "../../funcs/database.js"))

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 15,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to check for spamscore. It has a 15 second cooldown.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        // This is where you place the code you want to run for your command
        await database.query(`SELECT * FROM spamScores WHERE userId ="${msg.author.id}"`, [], (err, rows, fields) => {
            rows.forEach(row => {
                return msg.reply(`Your spam score is ${row.points}. Starting at 10 points you will be warned, and at 15 points you will be muted.`)
            })
        })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};