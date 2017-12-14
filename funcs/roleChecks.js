const path = require('path');
const database = require(path.resolve(__dirname, "./database.js"));
const premiumRole = '389510234156302336';
const memberRole = '383768374485712896';
const mutedRole = '383664302583709696';

module.exports = {
    async run(client) {
        //Check premium database to see if there are any members that need the role added/removed and then add or remove the role
        
        const [premiumRows, premiumFields] = await database.query("SELECT * FROM premium", [])
        
            premiumRows.forEach(row=>{
                let member = client.guilds.get('383660119218585600').member(row.userId);
                if(!member) {
                    return database.query(`DELETE FROM premium WHERE userId=${row.userId}`, []);
                }
                if(!member.roles.has(premiumRole)&&row.has == "1"&&!member.roles.has(mutedRole)) {
                    member.addRole(premiumRole)
                } else if(member.roles.has(premiumRole)&&row.has != "1"||member.roles.has(mutedRole)) {
                    member.removeRole(premiumRole)
                }
        });
                //Check members database to see if there are any members that need the role added/removed and then add or remove the role
            const [memberRows, memberFields] = await database.query("SELECT * FROM members", [])
                memberRows.forEach(row=>{
                    let member = client.guilds.get('383660119218585600').member(row.userId);
                    if(!member) {
                        return database.query(`DELETE FROM members WHERE userId=${row.userId}`, []);
                    }
                    if(!member.roles.has(memberRole)&&row.has == "1"&&!member.roles.has(mutedRole)) {
                        member.addRole(memberRole)
                    } else if(member.roles.has(memberRole)&&row.has != "1"||member.roles.has(mutedRole)) {
                        member.removeRole(memberRole)
                    }
            });
        
    },

    async init() {
        //Creates the databases if they have gone missing (for some odd reason)
        await database.query("CREATE TABLE IF NOT EXISTS premium (userId VARCHAR(19) PRIMARY KEY, has TEXT)", [])
        await database.query("CREATE TABLE IF NOT EXISTS members (userId VARCHAR(19) PRIMARY KEY, has TEXT)", [])
    }
}