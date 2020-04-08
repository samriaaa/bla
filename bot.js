const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = process.env.prefix;
const token = process.env.token;
const ownerId = process.env.ownerId;



client.once('ready', () => {
	client.user.setActivity(`${prefix}help`, {url: 'https://github.com/FavoHD/workshop-bot-favo'});

	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});


client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	if (message.content.toLowerCase().startsWith(`${prefix}help`)) {
		message.channel.send(`Help:`)
		return;
	} else if (message.content.toLowerCase().startsWith(`${prefix}ping`)) {
		const m = await message.channel.send(`Pong!`);
		m.edit(`Pong! My latency is ${m.createdTimestamp - message.createdTimestamp}ms!`);
		return;
	} else {
		message.channel.send(`You need to enter a valid command!`)
	}
});



client.login(token);
