const {
    Event
} = require('klasa');
const Cron = require('node-cron');
const path = require('path');
const antiSpamDecay = require(path.resolve(__dirname, "./anti-spam-decay.js"));
const roleChecks = require(path.resolve(__dirname, "./roleChecks.js"));

module.exports = {
    init(client) {
        // var test = Cron.schedule('*/10 * * * * *', ()=>{
        //     console.log('testity test test test')
        // })
        var antispam = Cron.schedule('*/10 * * * * *', () => {
            antiSpamDecay.run();
        });
        var roleCheck = Cron.schedule('*/10 * * * * *', () => {
            roleChecks.run(client);
        });
        var voiceCheck = Cron.schedule('*/5 * * * * *', () => {
            client.guilds.get('383660119218585600').members.forEach(member => {
                if(member.voiceChannel && !member.roles.has('389619246520598548')) {
                    member.addRole('389619246520598548')
                } else if(!member.voiceChannel && member.roles.has('389619246520598548')) {
                    member.removeRole('389619246520598548')
                }
            })
        });
    },

    stop(job) {
        //todo
    },

    start(job) {
        //todo
    },

    restart(job) {
        //todo
    }
}