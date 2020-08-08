const Axios = require("axios");

module.exports = {
	name: 'waifu',
	aliases: ['commands'],
	description: 'Generate a random waifu',
	cooldown: 5,
	execute(message, args) {
		const randomNumber = Math.floor(Math.random() * 1000);
		Axios.get("https://mywaifulist.moe/random?=" + randomNumber)
			.then((response) => {
				console.log(response.request.res.responseUrl);
				message.channel.send(`here\'s your waifu of the day uwu ` + response.request.res.responseUrl);
			})
			.catch((err) => {
				console.error("Error: " + err);
			});
	},
};