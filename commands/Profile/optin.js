const {
    Command
} = require('klasa');
const fullmember = '383768374485712896'
const path = require("path")
const database = require(path.resolve(__dirname, "../../funcs/database.js"))
var hash = '#'

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'optin',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to opt-in to our rules, and data storage policy. You will then be given the "Noble" role, and access to all of our channels.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {
        if (msg.member.roles.has(fullmember)) {
            msg.send('You have already opted in!')
            return;
        }
        await database.query(`REPLACE INTO members (userId, has) VALUES (${msg.author.id}, 1)`, []);
        await database.query(`INSERT INTO premium (userId, has) VALUES (${msg.author.id}, 0)`, []);
        msg.send('You have now opted in. Thank you, you will recieve the \'Nobles\' role within the next 10 seconds.')
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
        // await database.query(`CREATE TABLE IF NOT EXISTS disciplines (Amount INTEGER, Staff TEXT, Reason TEXT)`, [], (err, rows, fields) => {
        //     if(err) return console.log("Error at discipline table creation:\n"+err)
        // });
    }


};