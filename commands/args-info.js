module.exports = {
	name: 'args-info',
	description: 'Displays info about arguments',
	args:true,
	//this essentially sets a flag that arguments are required for this command, otherwise its undefined and the check in mybot doesnt happen
	execute(message, args) {
		if (args[0] === 'foo'){
			return message.channel.send('bar');
		}
		message.channel.send(`Your arguments are ${args}`);
	},
};