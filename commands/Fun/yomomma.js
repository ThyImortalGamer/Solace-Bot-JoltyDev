const { Command } = require('klasa');
const request = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'yomomma',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Get the bot to tell a yomamma joke. Warning: May be offensive.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        // This is where you place the code you want to run for your command
        const res = await request.get("http://api.yomomma.info").then(data => JSON.parse(data.text));
        return msg.channel.send(`📢 **Yomomma joke:** *${res.joke}*`);
        
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
