const { Command } = require('klasa');

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
            description: 'For leaders to delete a issue/archived channel.',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'Use this on a issue/archived channel, and it will be deleted.'
        });
    }

    async run(msg, [...params]) {

        if(!msg.member.roles.has('383714876222210071')) return msg.reply("You must be a staff team leader to use this command.")
        
        if(msg.channel.parent.id != '383793027455516675') return msg.reply("You may only use this on an archive channel.")


        const embed = new this.client.methods.Embed() //create an embed, send to staff channel
            .setTitle("ARCHIVE DELETED")
            .setDescription(`An archived channel was deleted.`)
            .setColor("#edff2d")
            .addField("Deleted Channel Name:", msg.channel.name)
            .addField("Deleted by:",msg.member.displayName)
            .setTimestamp();

        this.client.channels.get('384057004592857092').send({embed})

        msg.reply("Preparing to delete channel")
        setTimeout(() => {msg.channel.delete()}, 5000)

    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
