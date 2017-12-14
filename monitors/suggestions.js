const { Monitor } = require('klasa');
const suggestionschannel = '383716451489415178'

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: false,
            ignoreBots: true,
            ignoreSelf: false,
            ignoreOthers: false
        });
    }

    async run(msg) {
        console.log('suggestions.js has run')
        if(!msg.guild) return;
        if(msg.channel.id == suggestionschannel) {
            msg.react('👍')
            setTimeout(function () { msg.react('👎') }, 100)
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
        console.log('suggestions.js has init\'d')
    }

};