module.exports = {
	name: 'ping',
	description: 'Pong!',
execute(message, bot, command, prefix, sendEmbed, sendErrorEmbed) {
		sendEmbed("00ff00","Pong!",`API Latency is **${Math.round(bot.ping)} milliseconds**`)
	},

};
