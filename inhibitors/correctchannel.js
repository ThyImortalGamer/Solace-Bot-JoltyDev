const {
    Inhibitor
} = require('klasa');
const staffrole = '383664307243712515'
const botchannel = '383759035330985984'
const testchannel = '384388467469058058'

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, {
            name: 'correctchannel',
            enabled: true,
            spamProtection: false
        });
    }

    async run(msg, cmd) {
        if (!msg.guild) {

        } else if (!msg.channel.id == botchannel) {
            if(!msg.member.roles.has(staffrole)) return msg.reply("Please only use commands in <#383759035330985984>.")
        } else if (msg.member.id == '203709726322720768'&&msg.channel.id != botchannel&&msg.channel.id != testchannel) {
            
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};