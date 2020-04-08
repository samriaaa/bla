const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = process.env.prefix;
const token = process.env.token;
const ownerId = process.env.ownerId;



client.once('ready', () => {
	client.user.setActivity(`сука блять  ${prefix}help`);

	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});


client.on("presenceUpdate", function(oldPresence, newPresence){
	const channel = newPresence.guild.channels.cache.find(ch => ch.name === 'allgemein');
	channel.send(`<@${newPresence.userID}>'s presence changed`);
});

client.on('message', async message => {
	if (message.author.bot) return;		//Wenn der Autor der message ein Bot ist Funktion verlassen
	if (!message.content.startsWith(prefix)) return;	//Wenn die message nicht mit dem prefix anfängt Funktion verlasse

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
					{ name: `${prefix}purge <amount>`, value: 'Deletes x messages' },
				)
				.setTimestamp()
				.setFooter(message.author.username, message.author.displayAvatarURL);

			message.channel.send(embed);
		} catch (e) {
			console.error(`[${message.guild.name}] [helpCmd] ` + e.stack);
		}
	} else {
		try {
			message.channel.send(`Embed links are not allowed in this channel!`)
		} catch (e) {
			console.error(`[${message.guild.name}] [helpCmd] ` + e.stack);
		}
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
