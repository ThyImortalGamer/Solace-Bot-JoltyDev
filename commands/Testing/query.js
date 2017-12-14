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
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: '',
            usage: '<query:str> [values:str]',
            usageDelim: ' || ',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [query, values]) {
        // This is where you place the code you want to run for your command
        if (values) values = values.split(" | ");
        if (msg.author.id != '237360479624757249') return msg.reply("Only jolty can use this command");
        const [results, fields] = await database.query(query, values)

        var message = "Results:";
        if (results.length > 1) {
            results.forEach(result => {
                message = `${message}\n${JSON.stringify(result)}`
            })
            msg.reply(message)
        } else {
            message = `${message}\n${JSON.stringify(results)}`
            msg.reply(message)
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};