const {
    Command
} = require('klasa');

const path = require('path');
const database = require(path.resolve(__dirname, "../../funcs/database.js"));
const moment = require('moment');
const fs = require('fs-nextra');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "vent",
            enabled: true,
            runIn: ['dm'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'For member to anonamously vent with, in the member vents channel.',
            usage: '<vent:str>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [vent]) {
        //uncomment during testing
        //if(msg.author.id != '237360479624757249' && msg.author.id != '385632413667295234') return msg.reply("This command is being worked on, please try again later")

        if (!this.client.guilds.get('383660119218585600').member(msg.author.id)) return msg.reply(`You must be a member of the ${this.client.guilds.get('383660119218585600').name} guild to use this command.`);

        let embed

        await database.query("INSERT INTO vents (userId, vent, date) VALUES (?, ?, ?)", [msg.author.id, vent, moment.utc().format("dddd, MMMM Do YYYY, h:mm:ss a")]);
         let id;
        const [rows, fields] = await database.query(`SELECT * FROM anonIds WHERE userId="${msg.author.id}"`, []);
        if (rows.length >= 1) {
            id = rows[0].id
            if (vent.length >= 1024) {
                var middle = Math.floor(vent.length / 2);
                var before = vent.indexOf(' ', middle);
                var after = vent.lastIndexOf(' ', middle + 1);

                if (middle - before < after - middle) {
                    middle = before;
                } else {
                    middle = after;
                }

                var vent1 = vent.substr(0, middle);
                var vent2 = vent.substr(middle + 1);

                embed = new this.client.methods.Embed()
                    .setTitle("ANONYMOUS VENT")
                    .setDescription("To post an anonymous vent, go to dms with the bot and use the command ~vent followed by your message, the bot will then post your vent anonymously here.")
                    .setColor("#edff2d")
                    .addField("Anon id:", `Anon#${id}`)
                    .addField("Vent content Part 1:", vent1)
                    .addField("Vent content Part 2:", vent2)
                    .addField("DISCLAIMER", "__***Vents are logged with their author in the event of abuse, the log will never be looked at unless a vent violates guild rules.***__")
                    .setTimestamp();
            } else if (vent.length < 1024) {
                embed = new this.client.methods.Embed()
                    .setTitle("ANONYMOUS VENT")
                    .setDescription("To post an anonymous vent, go to dms with the bot and use the command ~vent followed by your message, the bot will then post your vent anonymously here.")
                    .setColor("#edff2d")
                    .addField("Anon id:", `Anon#${id}`)
                    .addField("Vent content:", vent)
                    .addField("DISCLAIMER", "__***Vents are logged with their author in the event of abuse, the log will never be looked at unless a vent violates guild rules.***__")
                    .setTimestamp();
            }
        } else {
            await database.query(`REPLACE INTO anonIds (userId) VALUES (?)`, [msg.author.id])
            const [newRows, newFields] = await database.query(`SELECT * FROM anonIds WHERE userId="${msg.author.id}"`, []);
                if (newRows.length >= 1) {
                    id = newRows[0].id
                }
                if (vent.length >= 1024) {
                    var middle = Math.floor(vent.length / 2);
                    var before = vent.indexOf(' ', middle);
                    var after = vent.lastIndexOf(' ', middle + 1);

                    if (middle - before < after - middle) {
                        middle = before;
                    } else {
                        middle = after;
                    }

                    var vent1 = vent.substr(0, middle);
                    var vent2 = vent.substr(middle + 1);



                    embed = new this.client.methods.Embed()
                        .setTitle("ANONYMOUS VENT")
                        .setDescription("To post an anonymous vent, go to dms with the bot and use the command ~vent followed by your message, the bot will then post your vent anonymously here.")
                        .setColor("#edff2d")
                        .addField("Anon id:", `Anon#${id}`)
                        .addField("Vent content Part 1:", vent1)
                        .addField("Vent content Part 2:", vent2)
                        .addField("DISCLAIMER", "__***Vents are logged with their author in the event of abuse, the log will never be looked at unless a vent violates guild rules.***__")
                        .setTimestamp();
                } else if (vent.length < 1024) {
                    embed = new this.client.methods.Embed()
                        .setTitle("ANONYMOUS VENT")
                        .setDescription("To post an anonymous vent, go to dms with the bot and use the command ~vent followed by your message, the bot will then post your vent anonymously here.")
                        .setColor("#edff2d")
                        .addField("Anon id:", `Anon#${id}`)
                        .addField("Vent content:", vent)
                        .addField("DISCLAIMER", "__***Vents are logged with their author in the event of abuse, the log will never be looked at unless a vent violates guild rules.***__")
                        .setTimestamp();
                }
        }
        this.ventChannel.send({
            embed
        }).catch((err) => {
            if (err) msg.reply("I appologize, something went wrong, please try sending your message again.")
        });
    }

    async init() {
        this.ventChannel = this.client.channels.get('385043868783214594');
        await database.query("CREATE TABLE IF NOT EXISTS vents (userId TEXT, vent TEXT, date TEXT)", []);
        await database.query("CREATE TABLE IF NOT EXISTS anonIds (userId VARCHAR(19) PRIMARY KEY, id INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE KEY)", []);
    }

};