const path = require('path');
const database = require(path.resolve(__dirname, "./database.js"));
const premiumRole = '389510234156302336';
const memberRole = '383768374485712896';
const mutedRole = '383664302583709696';

module.exports = {
    async run(client) {
        //Check premium database to see if there are any members that need the role added/removed and then add or remove the role
        await database.query("SELECT * FROM premium", [], (err, rows, fields) => {
            if (err) return console.log("Error on premium table selection:\n" + err)
            rows.forEach(row=>{
                let member = client.guilds.get('383660119218585600').member(row.userId);
                const roles = Array.from(member.roles.values());
                let userRoles = [];
                roles.forEach(role => {
                    userRoles.push(role.id);
                });
                let index = userRoles.indexOf('383660119218585600')
                if (index > -1) {
                    userRoles.splice(index, 1);
                }
                if(!userRoles.includes(premiumRole)&&row.has == "1"&&!userRoles.includes(mutedRole)) {
                    member.addRole(premiumRole)
                } else if(userRoles.includes(premiumRole)&&row.has != "1"||userRoles.includes(mutedRole)) {
                    member.removeRole(premiumRole)
                }
            })
        });
                //Check members database to see if there are any members that need the role added/removed and then add or remove the role
        await database.query("SELECT * FROM members", [], (err, rows, fields) => {
            if (err) return console.log("Error on members table selection:\n" + err)
            rows.forEach(row=>{
                let member = client.guilds.get('383660119218585600').member(row.userId);
                const roles = Array.from(member.roles.values());
                let userRoles = [];
                roles.forEach(role => {
                    userRoles.push(role.id);
                });
                let index = userRoles.indexOf('383660119218585600')
                if (index > -1) {
                    userRoles.splice(index, 1);
                }
                if(!userRoles.includes(memberRole)&&row.has == "1"&&!userRoles.includes(mutedRole)) {
                    member.addRole(memberRole)
                } else if(userRoles.includes(memberRole)&&row.has != "1"||userRoles.includes(mutedRole)) {
                    member.removeRole(memberRole)
                }
            })
        });
        
    },

    async init() {
        //Creates the databases if they have gone missing (for some odd reason)
        await database.query("CREATE TABLE IF NOT EXISTS premium (userId VARCHAR(19) PRIMARY KEY, has TEXT)", [], (err, rows, fields) => {
            if (err) return console.log("Error on premium table creation:\n" + err)
        });
        await database.query("CREATE TABLE IF NOT EXISTS members (userId VARCHAR(19) PRIMARY KEY, has TEXT)", [], (err, rows, fields) => {
            if (err) return console.log("Error on members table creation:\n" + err)
        });
    }
}