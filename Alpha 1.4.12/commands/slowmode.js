module.exports = {
	name: 'slowmode',
	description: 'Sets a channel\'s slowmode',
execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownslowmode) {
	if (cooldownslowmode.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 5 seconds.`)
	cooldownslowmode.add(message.author.id);
	setTimeout(() => {
		cooldownslowmode.delete(message.author.id);
	}, 5000);
  args = args.slice(1);
  if (args.length < 2) return sendErrorEmbed("Missing arguments for **slowmode** command.\n**Usage:** `slowmode <channel> <duration>`\n**Example:** `slowmode #general 5s`")
  var targetChannel = message.guild.channels.find(channel => channel.name === args[0]) || message.mentions.channels.first()
	if (message.mentions.channels.first()) {
		if (message.mentions.channels.first() != args[0]) return sendErrorEmbed("Incorrect arguments for **slowmode** command.\n**Usage:** `slowmode <channel> <duration>`\n**Example:** `slowmode #general 5s`")
	}
	if (!targetChannel) return sendErrorEmbed("Missing arguments for **slowmode** command.\n**Usage:** `slowmode <channel> <duration>`\n**Example:** `slowmode #general 5s`")
	if (["dm","group","category","voice"].includes(targetChannel.type)) return sendErrorEmbed("Missing arguments for **slowmode** command.\n**Usage:** `slowmode <channel> <duration>`\n**Example:** `slowmode #general 5s`")
	if (!targetChannel.permissionsFor(message.member).serialize().MANAGE_CHANNELS && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction(`You don't have permission to change slowmode in ${targetChannel}.`)
	if (!targetChannel.permissionsFor(message.guild.me).serialize().MANAGE_CHANNELS && !message.guild.me.hasPermission('ADMINISTRATOR') && message.guild.me.id != message.guild.owner.id) return sendErrorEmbed(`The bot doesn't have permission to change slowmode in ${targetChannel}.`)

	var slowmode = 0;
	if (args[1].endsWith('s')) {
		slowmode = parseInt(args[1].split("s").join(""), 10)
		if (slowmode.toString() === "NaN" || slowmode != args[1].split("s").join("")) slowmode = 0;
		if (slowmode > 21600 || slowmode < 0) return sendErrorEmbed("Argument error for **slowmode** command.\n`<duration` must be **between 0 and 21600** inclusive.")
		targetChannel.setRateLimitPerUser(slowmode)
		 .catch(error => console.log(error))
		sendSuccessfulAction(`${message.author} changed the slowmode of ${targetChannel} to ${slowmode} seconds`)
	}

	if (args[1].endsWith('m')) {
		slowmode = parseInt(args[1].split("m").join(""), 10) * 60
		if (slowmode.toString() === "NaN" || slowmode != args[1].split("m").join("")) slowmode = 0;
		if (slowmode > 21600 || slowmode < 0) return sendErrorEmbed("Argument error for **slowmode** command.\n`<duration` must be **between 0 and 21600** inclusive.")
		targetChannel.setRateLimitPerUser(slowmode)
		 .catch(error => console.log(error))
		sendSuccessfulAction(`${message.author} changed the slowmode of ${targetChannel} to ${slowmode} seconds`)
	}

	if (args[1].endsWith('h')) {
		slowmode = parseInt(args[1].split("h").join(""), 10) * 3600
		if (slowmode.toString() === "NaN" || slowmode != args[1].split("h").join("")) slowmode = 0;
		if (slowmode > 21600 || slowmode < 0) return sendErrorEmbed("Argument error for **slowmode** command.\n`<duration` must be **between 0 and 21600** inclusive.")
		targetChannel.setRateLimitPerUser(slowmode)
		 .catch(error => console.log(error))
		sendSuccessfulAction(`${message.author} changed the slowmode of ${targetChannel} to ${slowmode} seconds`)
	}

	if (!args[1].endsWith('s') && !args[1].endsWith('m') && !args[1].endsWith('h')) return sendErrorEmbed("Incorrect arguments for **slowmode** command.\n**Usage:** `slowmode <channel> <duration>`\n**Example:** `slowmode #general 5s`")
 },
}
