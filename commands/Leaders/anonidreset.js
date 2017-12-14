const {Command} = require('klasa');

const path = require('path');
const database = require(path.resolve(__dirname, "../../funcs/database.js"));
const config = require(path.resolve(__dirname, "../../config.json"));
const randomVariableName = require('webhook-discord');
const webhook = new randomVariableName(config.modLogUrl);

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
        
        webhook.custom("Anon IDs reset", `${msg.member}`, "Anon IDs were reset by", "#f47a42")

        await database.query("TRUNCATE anonIds", []).then(this.ventChannel.send("Anon IDs have been reset"));
        await database.query("TRUNCATE staffAnonIds", []).then(this.staffVentChannel.send("Anon IDs have been reset"));
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
        this.ventChannel = this.client.channels.get('385043868783214594');
        this.staffVentChannel = this.client.channels.get('384267589037326336');

    }

};