const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { 
            name:'userUpdate',
            enabled: true
        });
    }

    run(oldUser, newUser) {
        if(oldUser.nickname === newUser.nickname) return  //don't do anything unless it was a username change
        const embed = new this.client.methods.Embed()
        .setTitle("USERNAME CHANGED")
        .setColor("#edff2d")
        .setDescription(`A user (${oldUser.username}) changed username.`)
        .addField("Old Nickname:", oldUser.username)
        .addField("New Nickname:", newUser.username)
        .setTimestamp()
        this.chanLogs.send({ embed })
    }

    async init() {
        this.chanLogs = this.client.channels.get('384057004592857092');
    }

};