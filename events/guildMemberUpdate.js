const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { 
            name:'guildMemberUpdate',
            enabled: true
        });
    }

    run(oldMember, newMember) {
        if(oldMember.nickname === newMember.nickname) return  //don't do anything unless it was a nickname change
        const embed = new this.client.methods.Embed()
        .setTitle("NICKNAME CHANGED")
        .setColor("#edff2d")
        .setDescription(`A user (${oldMember.displayName}) changed nicknames.`)
        .addField("Old Nickname:", oldMember.displayName)
        .addField("New Nickname:", newMember.displayName)
        .setTimestamp()
        this.chanLogs.send({ embed })
    }

    async init() {
        this.chanLogs = this.client.channels.get('384057004592857092');
    }

};