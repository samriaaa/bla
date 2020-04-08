const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = process.env.prefix;
const token = process.env.token;
const ownerId = process.env.ownerId;



client.once('ready', () => {
	client.user.setActivity(`${prefix}help`, {url: 'https://www.twitch.tv/relaxbeats'});

	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});


client.on('message', async message => {
	if (message.author.bot) return;		//Wenn der Autor der message ein Bot ist Funktion verlassen
	if (!message.content.startsWith(prefix)) return;	//Wenn die message nicht mit dem prefix anfängt Funktion verlasse

	if (message.content.toLowerCase().startsWith(`${prefix}help`)) {
		help(message);
		return;
	} else if (message.content.toLowerCase().startsWith(`${prefix}ping`)) {
		const m = await message.channel.send(`Pong!`);
		m.edit(`Pong! My latency is ${m.createdTimestamp - message.createdTimestamp}ms!`);
		return;
	} else {
		message.channel.send(`You need to enter a valid command!`)
	}
});

function help(message) {
	if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
		try {
			var embed = new Discord.MessageEmbed()
				.setColor('#00c600')
				.setTitle('Help')
				.setAuthor('Workshop bot', client.user.avatarURL)
				.addFields(
					{ name: `Help`, value: 'List of all bot commands' },
					{ name: '\u200B', value: '\u200B' },
					{ name: `${prefix}help`, value: 'List all commands' },
					{ name: `${prefix}ping`, value: 'Returns bot`s latency' },
				)
				.setTimestamp()
				.setFooter(message.author.username, message.author.displayAvatarURL);

			message.channel.send(embed);
		} catch (e) {
			console.error(`[${message.guild.name}] [helpCmd] ` + e.stack);
		}
	} else {
		try {
			message.channel.send(`Embed Links sind nicht erlaubt`)
		} catch (e) {
			console.error(`[${message.guild.name}] [helpCmd] ` + e.stack);
		}
	}
}


client.login(token);
