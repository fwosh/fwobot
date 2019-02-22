module.exports = {
	name: 'hello',
	description: 'Fwobot says hi!',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`hey! my creator's great and you should hire her!`);
	},
};