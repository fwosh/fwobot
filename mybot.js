const fs = require('fs');
// node.js file structure module
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();	
const cooldowns = new Discord.Collection();
//creating a new collection (map with additional utility methods)

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//storing all .js files from commands to commandFiles

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	//for each file of the commandFiles, require the .js file and store to command
	client.commands.set(command.name, command);
	//SET: entries for map where key = name, and value = the command
}

client.once('ready', () => {
	console.log('Ready!');
});

// eslint-disable-next-line no-unused-vars
function getUserFromMentionRegEx(mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	// The id is the first and only match found by the RegEx.
	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.get(id);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	//if the message doesnt start with the prefix or the author is a bot, exit

	const args = message.content.slice(prefix.length).split(/ +/);
	//store args from message by removing prefix and splitting by space

	const commandName = args.shift().toLowerCase();
	//take the first part of args to mean the command and convert to lowercase

	const command = client.commands.get(commandName) 
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return message.reply('i dunno what that means...');
	//manages aliases as well

	if (command.args && !args.length){
		let reply = 'ur doing it wrong';
		//checks if args are required and whether there are args included
		if (command.usage){
			reply += `\nit's gotta be like this: ${prefix}${command.name} ${command.usage}`;
		}
		return message.channel.send(reply);
	}

	/*MANAGING COOLDOWNS*/
	if(!cooldowns.has(command.name)){
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3)*1000;

	if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	//timer of cooldown to delete the author from timestamps after elapsed time

	/*TRY CATCH FOR EXECUTING COMMAND*/
	try {
		command.execute(message, args, client);
		//GET: the command by the key name and execute while passing the message and args to the command function
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
});

client.login(token);