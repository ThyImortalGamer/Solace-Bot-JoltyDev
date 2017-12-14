const {
    Inhibitor
} = require('klasa');

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            spamProtection: false
        });
    }

    async run(msg, cmd) {
        // This is where you place the code you want to run for your inhibitor
        if (!msg.guild) {
        } else if (msg.mentions.has('384045955772710912') || msg.mentions.everyone) return true;
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};