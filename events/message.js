const { Event } = require('klasa');
const path = require('path'); 
const antiSpam = require(path.resolve(__dirname, "../funcs/anti-spamdb.js"))


module.exports = class extends Event {

	run(msg) {
		if (this.client.ready) this.client.monitors.run(msg);
	}

};
