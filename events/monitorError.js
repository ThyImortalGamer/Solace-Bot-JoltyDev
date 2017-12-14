const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { 
            enabled: true
        });
    }

    async run(msg, monit, err) {
        // This is where you place the code you want to run for your event  
        console.log(`${monit}\n${err}`)
        
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
