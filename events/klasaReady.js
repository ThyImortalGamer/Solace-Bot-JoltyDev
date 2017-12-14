const { Event } = require('klasa');
const path = require('path');
const cronJobs = require(path.resolve(__dirname, "../funcs/cron-jobs.js"))
const roleChecks = require(path.resolve(__dirname, "../funcs/roleChecks.js"))

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { 
            enabled: true
        });
    }

    run() {
        // This is where you place the code you want to run for your event
        cronJobs.init(this.client);
        roleChecks.init();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
