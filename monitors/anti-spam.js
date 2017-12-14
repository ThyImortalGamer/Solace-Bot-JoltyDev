const { Monitor } = require('klasa');
const path = require('path'); 
const antiSpam = require(path.resolve(__dirname, "../funcs/anti-spamdb.js"))
module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false
        });
    }

    async run(msg) {
        // This is where you place the code you want to run for your monitor
        if(!msg.guild) return;
        if(msg.channel.parentId == '384425107810025472') return;
		antiSpam.run(msg);
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
        antiSpam.init();
    }

};
