module.exports = {
	name: 'version',
	description: 'The bot version.',
execute(message, version, command, prefix, sendEmbed, sendErrorEmbed, cooldownversion) {
	if (cooldownversion.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 3 seconds.`)
	cooldownversion.add(message.author.id);
	setTimeout(() => {
		cooldownversion.delete(message.author.id);
	}, 3000);

		sendEmbed("00ff00","About RandomBot6289",`RandomBot6289 is a Discord bot that is being developed by RandomPerson0244#0244 (549471563616092171)\nCurrent version: **${version}**\n\n**Alpha 1.4** - Added developer commands\n**Alpha 1.3** - Added custom prefixes\n**Alpha 1.2** - Added kick and ban commands.`)
	},

};
