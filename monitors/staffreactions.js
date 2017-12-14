const { Monitor } = require('klasa');
const suggestions = '383716451489415178'
const jobs = '383729667884056586'

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            ignoreBots: false,
            ignoreSelf: false,
            ignoreOthers: false
        });
    }

     async run(msg) {
        if(!msg.guild) return;
        if(msg.channel.id == suggestions) {
            msg.react('👍')
        }
        if(msg.channel.id == jobs) {
            msg.react('✅')
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};