const {Client} = require('klasa');
const config = require('./config.json');
const database = require("./funcs/database")

Client.defaultPermissionLevels
    .addLevel(5, true, (client, msg) => msg.guild && msg.member.roles.has('383664307243712515'))
    .addLevel(6, true, (client, msg) => msg.guild && msg.member.permissions.has('ADMINISTRATOR'));

const client = new Client({
    prefix: ['~', 'Jol, ', 'Jolty, '],
    cmdEditing: true,
    disabledEvents: [
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        'TYPING_START',
        'RELATIONSHIP_ADD',
        'RELATIONSHIP_REMOVE',
        'CHANNEL_PINS_UPDATE',
        'PRESENCE_UPDATE',
        'USER_UPDATE',
        'USER_NOTE_UPDATE',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL'
    ],
    console: {
        useColor: true
    }
});

database.init();
client.login(config.token);