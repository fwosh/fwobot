module.exports = {
	name: 'fwobot',
	description: 'fwobot greeting',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('hiya! i\'m fwobot. I was born recently.');
	},
};