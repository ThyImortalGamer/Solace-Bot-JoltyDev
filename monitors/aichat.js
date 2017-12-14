const {
    Monitor
} = require('klasa');
const path = require('path');
const config = require(path.resolve(__dirname, "../config.json"));
const apiai = require('apiai')(config.aiToken)
const APIAI_SESSION_ID = Math.floor(Math.random() * 1000000)

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false // 0.4.0-dev only
        });
    }

    async run(msg) {
        // This is where you place the code you want to run for your monitor
        if (!msg.guild) return;
        //if (msg.channel.id != '390564832123813888') return;
        if (!msg.mentions.has('384045955772710912')||msg.mentions.everyone) return;

        let apiaiReq = apiai.textRequest(msg.content.substring(23), {
            sessionId: APIAI_SESSION_ID
        });

        apiaiReq.on('response', (response) => {
            let aiText = response.result.fulfillment.speech;
            msg.reply(aiText);
        });

        apiaiReq.on('error', (error) => {
            console.log(error);
        });

        apiaiReq.end();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};