const Discord = require('discord.js');	//discord.js Library wird geladen
const client = new Discord.Client();	//Bot Client wird initialisiert

const prefix = process.env.prefix;	//Prefix für Bot wird festgelegt
const token = process.env.token;	//Bot Token wird festgelegt


client.once('ready', () => {	//Wenn Bot fertig geladen ist
	client.user.setActivity(`сука блять  ${prefix}help`);	//Setze Playing Activity von Bot

	console.log('Ready!');
});

client.once('reconnecting', () => {	//Wenn sich Bot versucht zu Websocket zu reconnecten
	console.log('Reconnecting!');
});

client.once('disconnect', () => {	//Wenn Bot von Websocket disconnectet ist
	console.log('Disconnect!');
});


client.on('presenceUpdate', function (oldMember, newMember) {
	if (oldMember.status != 'offline' && oldMember.status != 'online') return;	//Nur ausführen, falls user vorher online oder offline war
	const channel = newMember.guild.channels.cache.find(ch => ch.name === 'allgemein');

	if (newMember.status == 'online') {
		channel.send(`<@${newMember.userID}> is now ${newMember.status}!`);
	} else if (newMember.status == 'offline') {
		channel.send(`<@${newMember.userID}> is now ${newMember.status}!`);
	}
});

client.on('message', async message => {
	if (message.author.bot) return;		//Wenn der Autor der Message ein Bot ist, Funktion verlassen
	if (!message.content.startsWith(prefix)) return;	//Wenn die Message nicht mit dem Prefix anfängt, Funktion verlasse

	if (message.content.toLowerCase().startsWith(`${prefix}help`)) {
		help(message);
		return;
	} else if (message.content.toLowerCase().startsWith(`${prefix}ping`)) {
		ping(message);
		return;
	} else if (message.content.toLowerCase().startsWith(`${prefix}purge`)) {
		purge(message);
		return;
	} else {
		message.channel.send(`You need to enter a valid command!`)
	}
});

function help(message) {
	if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
		var embed = new Discord.MessageEmbed()
			.setColor('#00c600')
			.setTitle('Help')
			.setAuthor('Workshop bot', client.user.avatarURL)
			.addFields(
				{ name: `Help`, value: 'List of all bot commands' },
				{ name: '\u200B', value: '\u200B' },
				{ name: `${prefix}help`, value: 'List all commands' },
				{ name: `${prefix}ping`, value: 'Returns bot`s latency' },
				{ name: `${prefix}purge <amount>`, value: 'Deletes x messages' },
			)
			.setTimestamp()
			.setFooter(message.author.username, message.author.displayAvatarURL);

		message.channel.send(embed);
	} else {
		message.channel.send(`Embed links are not allowed in this channel!`)
	}
}

async function ping (message) {
	const answerMessage = await message.channel.send(`Pong!`);
	answerMessage.edit(`Pong! My latency is ${answerMessage.createdTimestamp - message.createdTimestamp}ms!`);
}

function purge(message) {
	const args = message.content.split(" ");
	var amount = args[1];
	if (!amount) return message.channel.send(`Usage: ${prefix}purge <amount>`);
	try {
		const amount = parseInt(amount);
	} catch(e) {
		return message.channel.send(`Amount has to be a number!`);
	}

	message.channel.messages.fetch({limit: amount})
		.then(messages => {
			messages.map(msg => {
		    	msg.delete();
			})
		})

	if (amount == 1) {
		message.channel.send(`1 message have been deleted!`)
	} else {
		message.channel.send(`${amount} messages have been deleted!`)
	}
}


client.login(token);
