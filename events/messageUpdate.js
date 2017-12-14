const { Event } = require('klasa');
var jsdiff = require('diff');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { 
            name:'messageUpdate',
            enabled: true
        });
    }

    run(oldMessage, newMessage) {
       
        if(oldMessage.content === newMessage.content || oldMessage.author.bot) return

        var diff = jsdiff.diffWords(oldMessage.content, newMessage.content);

        let log = "";
        
        diff.forEach(function(part){
            part.added ? log += ` __${part.value}__` : 
                part.removed ? log += ` ~~${part.value}~~` : log += ` ${part.value}`;
        });



        const embed = new this.client.methods.Embed() //create an embed, send to staff channel
            .setTitle("MESSAGE EDITED")
            .setDescription(`A message by ${oldMessage.member.displayName} was edited.`)
            .setColor("#edff2d")
            .addField("Old Message:", oldMessage.content)
            .addField("New Message:", newMessage.content)
            .addField("Change:", log)
            .addField("Channel:", oldMessage.channel.name)
            .setTimestamp();

        this.client.channels.get('384057004592857092').send({embed}).catch()
    }

    async init() {
        this.chanLogs = this.client.channels.get('384053405460463616');
    }

};