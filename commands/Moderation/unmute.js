const {
    Command
} = require('klasa');
const fullmember = '383768374485712896'
const muted = '383664302583709696'
const staffrole = '383664307243712515'
const path = require("path")
let archived;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'unmute',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'For staff to unmute a no longer troublesome user with.',
            usage: '<muteduser:member> [args:str]',
            usageDelim: " ",
            extendedHelp: `This is to unmute a user, with optional delete arguments for leaders only. Do "!unmute @user d" or "!unmute @user delete" in the mute channel to delete the channel after, only if you are a leader. Please only delete the channel if it is for something really silly, and you are sure it won't be needed to be referenced later on. If you have the slightest hint we may need it later, please just do "!unmute @user", and it will be moved to the archives catagory.`
        });
    }

    async run(msg, [muteduser, args]) {

        if (!msg.member.roles.has(staffrole)) {
            return msg.reply('You are not a staff member.')
        } else if (!msg.member.roles.has(muted) && msg.channel.parent.id == '383793027455516675') {
            return msg.reply('This user was already unmuted with the channel archived. Please use delete command instead')
        }
            var roles;
            roles = "blah"

            muteduser.removeRole(muted);
            muteduser.setMute(false);
            muteduser.setDeaf(false);
            muteduser.addRole(fullmember)
                .catch(error => {
                    msg.send('Full Member role NOT applied.');
                })
                .then(msg.send('User unmuted!'))
            let archived;
            if (!args) {
                msg.channel.overwritePermissions(muteduser, {
                        'ADD_REACTIONS': false,
                        'VIEW_CHANNEL': false,
                        'SEND_MESSAGES': false,
                        'EMBED_LINKS': false,
                        'ATTACH_FILES': false,
                        'READ_MESSAGE_HISTORY': false,
                    })
                    .catch(console.error);
                (msg.channel.setParent('383793027455516675'))
                setTimeout(function () {
                    msg.channel.lockPermissions()
                }, 100)

            } else if (args == 'd' || args == 'delete') {
                if (!msg.member.roles.has('383714876222210071')) {
                    msg.reply("You must be a staff team leader to use this option, archiving instead.")

                    msg.channel.overwritePermissions(muteduser, {
                            'ADD_REACTIONS': false,
                            'VIEW_CHANNEL': false,
                            'SEND_MESSAGES': false,
                            'EMBED_LINKS': false,
                            'ATTACH_FILES': false,
                            'READ_MESSAGE_HISTORY': false,
                        })
                        .catch(console.error);
                    (msg.channel.setParent('383793027455516675'))
                    setTimeout(function () {
                        msg.channel.lockPermissions()
                    }, 100)

                    archived = "true"
                } else {
                    setTimeout(function () {
                        msg.channel.delete()
                    }, 1000)
                    archived = "false"
                }

            } else {
                msg.send(`${args} is not a option.`)

            }

            const embed = new this.client.methods.Embed()
                .setTitle("USER UNMUTED")
                .setColor("#06a008")
                .setDescription(`A user (${muteduser.displayName}) was unmuted by ${msg.author.tag}`)
                .addField("Archived:", archived)
                .setTimestamp()
            this.chanLogs.send({
                embed
            })
    }

    async init() {
        this.chanLogs = this.client.channels.get('384057004592857092');
    }

};