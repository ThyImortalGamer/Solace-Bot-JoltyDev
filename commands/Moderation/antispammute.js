const {
    Command
} = require('klasa');
const moment = require('moment')

const staffrole = '383664307243712515'
const everyone = '383660119218585600'
const fullmember = '383768374485712896'
const muted = '383664302583709696'
const path = require('path');
const database = require(path.resolve(__dirname, "../../funcs/database.js"))
const hash = '#'
let channelmessage;
let mutereason;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'antispammute',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'This is for the bot only, please do not try and use it.',
            usage: '<muteduser:member> [reason:str]',
            usageDelim: ' , ',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [muteduser, reason]) {
        
        if(!msg.seeecret) return msg.reply('Sorry, only the bot can use this.');

        reason = reason[0]

        const roles = Array.from(muteduser.roles.values());
        let userRoles = [];
        roles.forEach(role => {
            userRoles.push(role.id)
        })
        let index = userRoles.indexOf('383660119218585600')
        if (index > -1) {
            userRoles.splice(index, 1);
        }
        userRoles = userRoles.join(" ");

        await database.query("REPLACE INTO mutedUserRoles (userId, roles) VALUES (?, ?)", [muteduser.id, userRoles], (err, rows, fields) => {
            if (err) console.log("Error on insert:\n" + err)
        });

            if (!reason) {
                channelmessage = `${muteduser}\n**You have been muted!**\n\n**Staff Member who issued mute: __${msg.author.tag}__**\n\nPlease wait for a member of staff to speak to you.`
                mutereason = "Anti-Spam mute"
            } else {
                channelmessage = `${muteduser}\n**You have been muted!**\n\n**Reason: __${mutereason}.__**${muteduser.user.tag == msg.author.tag ? '' : `**Staff Member who issued mute: __${msg.author.tag}__**`}\n\nPlease wait for a member of staff to speak to you.`
                mutereason = "Anti-Spam mute"
            }

            let username = muteduser.user.tag.replace(" ", "_").replace("#", "_");
            let userid = muteduser.id

            const embed = new this.client.methods.Embed()
                .setTitle("USER MUTED")
                .setColor("#c60000")
                .setDescription(`A user (${username}) has been muted by ${msg.author.tag}.`)
                .addField("Reason", mutereason)
                .setTimestamp();


                muteduser.setMute(true);
                muteduser.setDeaf(true);
                muteduser.removeRole(fullmember);
                muteduser.addRole(muted, [reason])
                    .catch(error2 => {
                        msg.send('Mute Role NOT applied.');
                    });
            msg.send(`${muteduser} has been muted.`)

            msg.guild.createChannel('mute', 'text', {
                    parent: '384425107810025472'
                })
                .catch('Error creating channel!')
                .then(function (editchannel) {
                    editchannel.setName(`mute_${username}`)
                        .catch(error => {
                            setTimeout(function () {
                                editchannel.setName(`mute_${userid}`)
                                msg.send('Error naming channel, defaulted to UserID. User has been muted.')
                            }, 1000)
                        })
                    editchannel.overwritePermissions(staffrole, {
                            'ADD_REACTIONS': true,
                            'VIEW_CHANNEL': true,
                            'SEND_MESSAGES': true,
                            'MANAGE_MESSAGES': true,
                            'MANAGE_CHANNEL': true,
                            'EMBED_LINKS': true,
                            'ATTACH_FILES': true,
                            'READ_MESSAGE_HISTORY': true,
                            'MENTION_EVERYONE': true,
                        })
                        .catch(error => {
                            msg.send('Staff Permissions NOT applied.')
                        })
                    editchannel.overwritePermissions(everyone, {
                        'VIEW_CHANNEL': false,
                    })
                    editchannel.overwritePermissions(muteduser, {
                            'ADD_REACTIONS': true,
                            'VIEW_CHANNEL': true,
                            'SEND_MESSAGES': true,
                            'EMBED_LINKS': true,
                            'ATTACH_FILES': true,
                            'READ_MESSAGE_HISTORY': true,
                        })
                        .catch(error => {
                            msg.send('Permissions NOT applied for muted user.')
                        })
                        .then(function () {
                            editchannel.send(channelmessage)
                        })
                })
                .then(this.chanLogs.send({
                    embed
                }))
    }

    async init() {
        this.chanLogs = this.client.channels.get('384057004592857092');
    }

};