const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'For leaders to archive a channel.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'Simply use this on a mute or issue channel, and it will be archived.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.roles.has('383714876222210071')) return msg.reply("You must be a staff team leader to use this command.")
        if (!msg.channel.parent) {

        } else if (msg.channel.parent.id == '383793027455516675') return msg.reply("This channel is already archived.")

        msg.reply('Archiving...')

        msg.channel.setParent('383793027455516675')

        msg.reply('Done.')

        const embed = new this.client.methods.Embed() //create an embed, send to staff channel
            .setTitle("CHANNEL ARCHIVED")
            .setDescription(`A channel was archived.`)
            .setColor("#edff2d")
            .addField("Archived Channel Name:", msg.channel.name)
            .addField("Archived by:", msg.member.displayName)
            .setTimestamp();

        this.client.channels.get('384057004592857092').send({
            embed
        })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};