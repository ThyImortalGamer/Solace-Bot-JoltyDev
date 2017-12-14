const {
    Command,
    RichDisplay
} = require('klasa');
const path = require('path');
const database = require(path.resolve(__dirname, "../../funcs/database.js"))
const fullmember = '383768374485712896'
let Level;
let XP;
let Colour;
let booster;
let maxxp;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'profile',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Use this to view your profile, once you have opted in. Optional @user argument to view someone else\'s profile \"!profile @user\"',
            usage: '[member:member]',
            usageDelim: " ",
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [member]) {
        if(!member) {
            if (!msg.member.roles.has(fullmember)) return msg.reply('You have no opted in yet.')
            
                    const display = new RichDisplay(new this.client.methods.Embed()
                        .setAuthor(msg.author.username)
                        .setTitle('Profile')
                        .setDescription('This is your profile. Use the reactions to scroll through.')
                    );
            
                    await database.query(`SELECT * FROM profiles WHERE userId ="${msg.author.id}"`, [], (err, rows, fields) => {
                        rows.forEach(row => {
                            if (!row) {
                                return msg.reply(`You haven't got a DB entry. If you haven't already, please do !optout, then !optin and you will get one. If you think this is a mistake, please contact one of our Keepers of the Code.`)
                            } else {
                                if (row.discipline == 'No') {
                                    booster = '**No discipline:** x2 credits and XP gain.'
                                } else {
                                    booster = 'None at the moment.'
                                }
                                maxxp = row.level * row.level * 25
            
                                display.addPage(template =>
                                    template.addField('Level', `${row.level}`)
                                    .addField('XP', `${row.points}/${maxxp}`)
                                    .addField('Soul points:', `${row.credits}`)
                                    .setColor(row.Colour)
                                    .setDescription('This is your Level/XP. Use the reactions to scroll through.')
                                );
            
                                display.addPage(template =>
                                    template.addField('Boosters', `${booster}`)
                                    .setColor(row.Colour)
                                    .setDescription('These are your boosters. They \'boost\' your level/xp gain. Use the reactions to scroll through. [SORT OF IMPLEMENTED]')
                                )
                            }
                        })
                    });
            
                    display.run(await msg.send('Loading profile...'), {
                        firstLast: false,
                        time: 120000,
                        filter: (reaction, user) => user === msg.author
                    });
            
        } else {
            if (!member.roles.has(fullmember)) return msg.reply('You have no opted in yet.')
            
                    const display = new RichDisplay(new this.client.methods.Embed()
                        .setAuthor(msg.author.username)
                        .setTitle('Profile')
                        .setDescription(`This is ${member.displayName}'s profile. Use the reactions to scroll through.`)
                    );
            
                    await database.query(`SELECT * FROM profiles WHERE userId ="${member.id}"`, [], (err, rows, fields) => {
                        rows.forEach(row => {
                            if (!row) {
                                return msg.reply(`You haven't got a DB entry. If you haven't already, please do !optout, then !optin and you will get one. If you think this is a mistake, please contact one of our Keepers of the Code.`)
                            } else {
                                if (row.discipline == 'No') {
                                    booster = '**No discipline:** x2 credits and XP gain.'
                                } else {
                                    booster = 'None at the moment.'
                                }
                                maxxp = row.level * row.level * 25
            
                                display.addPage(template =>
                                    template.addField('Level', `${row.level}`)
                                    .addField('XP', `${row.points}/${maxxp}`)
                                    .addField('Soul points:', `${row.credits}`)
                                    .setColor(row.Colour)
                                    .setDescription(`This is ${member.displayName}'s Level/XP. Use the reactions to scroll through.`)
                                );
            
                                display.addPage(template =>
                                    template.addField('Boosters', `${booster}`)
                                    .setColor(row.Colour)
                                    .setDescription(`These are ${member.displayName}'s boosters. They 'boost' your level/xp gain. Use the reactions to scroll through. [SORT OF IMPLEMENTED]`)
                                )
                            }
                        })
                    });
            
                    display.run(await msg.send('Loading profile...'), {
                        firstLast: false,
                        time: 120000,
                        filter: (reaction, user) => user === msg.author
                    });
            
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};