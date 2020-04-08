const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = process.env.prefix;
const token = process.env.token;
const ownerId = process.env.ownerId;


//Youtube
const ytdl = require('ytdl-core');
const {YTSearcher} = require('ytsearcher');
const ytpl = require('ytpl');

const YoutubeApiKey = process.env.youtubeApiKey;
const searcher = new YTSearcher(YoutubeApiKey);

//Spotify
const Spotify = require('spotify-web');

if ((process.env.spotifyUsername) && (process.env.spotifyPassword)) {
	const spotifyUsername = process.env.spotifyUsername;
	const spotifyPassword = process.env.spotifyPassword;
}

//Soundcloud
var soundcloudr = require('soundcloudr');

if (process.env.soundcloudClientId) {
	soundcloudr.setClientId(process.env.soundcloudClientId);
}


const queues = new Map();



client.once('ready', () => {
	client.user.setPresence({ game: { name: prefix+'help' }, status: 'online' })

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
	} else {
		message.channel.send(`You need to enter a valid command!`)
	}
});

client.login(token);
