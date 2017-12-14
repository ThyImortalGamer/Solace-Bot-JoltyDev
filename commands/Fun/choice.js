const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: ['choose'],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Make the bot choose, between certain things.',
            usage: '<choices:str>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [args]) {
        // This is where you place the code you want to run for your command

        let choices = args.split(" ")

        choices.forEach(choice => {
            if (choice.toLowerCase() == 'or') {
                choices.splice(choices.indexOf(choice), 1);
            }
        })

        msg.reply(`I think you should go with "${choices[Math.floor(Math.random() * choices.length)]}"`);
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};