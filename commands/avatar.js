module.exports = {
	name: 'avatar',
	description: 'displays your avatar',
	aliases: ['icon', 'pfp'],
	execute(message, args) {
		return message.channel.send(`Your avatar is ${message.author.displayAvatarURL}`);
	},
};