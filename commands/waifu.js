module.exports = {
	name: 'waifu',
  aliases: ['commands'],
	description: 'Generate a random waifu',
	cooldown: 5,
	execute(message, args) {
    const randomNumber = Math.floor(Math.random() * 1000);
		message.channel.send(`here\'s your waifu of the day uwu https://mywaifulist.moe/random?=${randomNumber}`);
	},
};