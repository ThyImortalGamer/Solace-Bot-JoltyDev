const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { 
            name:'messageDelete',
            enabled: true
        });
    }

    run(message) {
        const embed = new this.client.methods.Embed()
        .setTitle("MESSAGE DELETED")
        .setColor("#edff2d")
        .setDescription(`A message by ${message.member.displayName} was deleted.`)
        .addField("Message:", message)
        .addField("Channel:", message.channel.name)
        .setTimestamp();
        this.chanLogs.send({ embed }).catch()
    }

    async init() {
        this.chanLogs = this.client.channels.get('384057004592857092');
    }

};