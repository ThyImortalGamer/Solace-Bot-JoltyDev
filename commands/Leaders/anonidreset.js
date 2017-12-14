const { Command } = require('klasa');

const path = require('path');
const database = require(path.resolve(__dirname, "../../funcs/database.js"));

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'For leaders to reset Anon IDs',
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'You use this to reset the AnonID of the users in the anonymous vent list; this will also reset for staff vents. You can also DM the command to the bot.'
        });
    }

    async run(msg) {
        // This is where you place the code you want to run for your command
        if (!msg.member.roles.has('383714876222210071')) return msg.reply("You must be a staff team leader to use this command.")
        await database.query("TRUNCATE anonIds", [], (err, rows, fields)=>{
            if(err) return console.log("Error emptying anonIds:\n"+err)
            this.ventChannel.send("Anon IDs have been reset");
        })
        await database.query("TRUNCATE staffAnonIds", [], (err, rows, fields)=>{
            if(err) return console.log("Error emptying staffAnonIds:\n"+err)
            this.staffVentChannel.send("Anon IDs have been reset");
        })

    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
        this.ventChannel = this.client.channels.get('385043868783214594');
        this.staffVentChannel = this.client.channels.get('384267589037326336');

    }

};
