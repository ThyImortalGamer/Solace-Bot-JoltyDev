const { Command } = require('klasa');

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
            description: 'Stockas the stick keeps falling asleep in VC... sooooo we have a command to get him out of it now...',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        // This is where you place the code you want to run for your command
        if (!msg.member.roles.has('383714876222210071')&&msg.author.id != '237360479624757249') return msg.reply("You must be a staff team leader or Jolteon to use this command.")
        

        this.client.channels.get('383660119218585604').clone({name: "Stockas Bedroom"}).then(channel => {
            channel.setParent('383660119218585603')
            msg.guild.member('191315332680384514').setVoiceChannel(channel)
            channel.delete();
        })
        msg.reply("The sleeping stick has been kicked")
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
