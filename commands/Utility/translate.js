const { Command } = require('klasa');
const path = require('path');
var languages = require(path.resolve(__dirname, '../../node_modules/google-translate-api/languages.js'))

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "translate",
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: ['t'],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to translate from a non English language.',
            usage: '<message:str>',
            usageDelim: undefined,
            extendedHelp: ''
        });
    }

    async run(msg, [message]) {
        const translate = require('google-translate-api');
        translate(message, {to: 'en'}).then(res => {
            var code = res.from.language.iso.toLowerCase()
            console.log(code)
            console.log(languages[code])
            msg.send(`I translated "**${message}**" to: "**${res.text}**". Language: "**${languages[code]}**"`);

        }).catch(err => {
            console.error(err);
            msg.send(`Hmm. There seems to be a issue.`);
        });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};