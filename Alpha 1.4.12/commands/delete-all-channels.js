module.exports = {
	name: 'delete-all-channels',
	description: 'Deletes all channels in a server.',
execute(message, args, bot, command, prefix, sendEmbed, sendUnsuccessfulAction, sendErrorEmbed, cooldowndac) {
	if (cooldowndac.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 30 seconds.`)
	cooldowndac.add(message.author.id);
	setTimeout(() => {
		cooldowndac.delete(message.author.id);
	}, 30000);
 args = args.slice(1);
 if (!message.member.hasPermission("ADMINISTRATOR") && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("You are missing the **Administrator** permission to use this command.")
 if (!message.guild.me.hasPermission("ADMINISTRATOR") && message.guild.me.id != message.guild.owner.id) return sendErrorEmbed("The bot is missing the **Administrator** permission.")
 let guildName = message.guild.name
 if (!args[0]) return sendEmbed("ffff00","Confirmation",`Are you sure that you want to delete all ${message.guild.channels.array().length} channels in the server? This action **cannot be undone!!!**\nSend \`delete-all-channels confirm\` to confirm.`)
 if (args[0].toLowerCase() != "confirm") return sendEmbed("ffff00","Confirmation",`Are you sure that you want to delete all ${message.guild.channels.array().length} channels in the server? This action **cannot be undone!!!**\nSend \`delete-all-channels confirm\` to confirm.`)
 message.guild.channels.deleteAll()
 message.member.send(`You have successfully deleted all channels from the server: **${guildName}**`)
 },
};
