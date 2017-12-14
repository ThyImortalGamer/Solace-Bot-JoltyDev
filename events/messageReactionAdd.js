const { Event } = require("klasa");
const suggestions = "383716451489415178";
const leaderchan = "384136221661724673";
const jobs = "383729667884056586";

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: "messageReactionAdd",
            enabled: true
        });
    }

    async run(messageReaction, user) {
        //console.log(messageReaction.users.filter(u => !u.bot).size); testing purposes
        const usercolour = messageReaction.message.member.displayHexColor;
        const listOfUsers = messageReaction.users.filter(u => u.id !== this.client.user.id).map(u => u.username).join("\n");
        if (messageReaction.message.channel.id === suggestions) {
            if (messageReaction.users.filter(u => !u.bot).size >= 7) {
                //console.log("Suggestion passed!"); testing purposes
                const embed = new this.client.methods.Embed()
                    .setTitle("New suggestion:")
                    .setColor(usercolour)
                    .setDescription(`A new suggestion by ${messageReaction.message.author.username} has been passed.`)
                    .addField("the suggestion", messageReaction.message.content)
                    .addField("Users who passed this", listOfUsers)
                    .setTimestamp();
                this.chanLead.send({ embed });
                messageReaction.message.delete({ timeout: 1000, reason: "Suggestion Passed!" });
            }
        } else if (messageReaction.message.channel.id === jobs) {
            //console.log(1); testing purposes
            const reqCount = parseInt(messageReaction.message.embeds[0].fields[1].value);
            //console.log("I am working!"); testing purposes
            const newlistOfUsers = messageReaction.users.filter(u => !u.bot).map(u => u.username).join(", ");
            //console.log(newlistOfUsers); testing purposes
            if (messageReaction.users.filter(u => !u.bot).size === reqCount && messageReaction.message.embeds[0].fields[2] !== 'undefined') {
                //console.log("Job claimed!"); testing purposes
                messageReaction.message.edit({ embed: messageReaction.message.embeds[0].addField("Claimed by:", newlistOfUsers) });
            }
        }
    }

    async init() {
        this.client.channels.get(suggestions).messages.fetch({limit: 100}); // fetch all the messages from suggestions
        this.client.channels.get(jobs).messages.fetch({limit: 100}); // fetch all the message from jobs
        this.chanLead = this.client.channels.get(leaderchan);
        this.chanJobs = this.client.channels.get(jobs);
    }
};