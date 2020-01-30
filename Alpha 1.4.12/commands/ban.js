module.exports = {
	name: 'ban',
	description: 'Bans a member',
execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownban) {
if (cooldownban.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 5 seconds.`)
cooldownban.add(message.author.id);
setTimeout(() => {
	cooldownban.delete(message.author.id);
}, 5000);
args = args.slice(1);
if(!message.member.hasPermission('BAN_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("You are missing the **Ban members** permission to use this command.")

if(!args[0]) return sendErrorEmbed("Missing arguments for **ban** command.\n**Usage:** `ban <user> [reason]`\n**Example:** `ban @user#0000 breaking rules`\n`ban 123456789012345678 breaking rules`")

if(message.mentions.members.first()) {
	if(message.mentions.members.first() != args[0].split("!").join("")) return sendErrorEmbed("Incorrect arguments for **ban** command.\n**Usage:** `ban <user> [reason]`\n**Example:** `ban @user#0000 breaking rules`\n`ban 123456789012345678 breaking rules`")
  const banTarget = message.mentions.members.first();
	if(!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) return sendErrorEmbed("The bot is missing the **Ban members** permission.")
  if(message.member.highestRole.comparePositionTo(banTarget.highestRole) <= 0 && message.author.id != message.guild.owner.id) return sendUnsuccessfulAction(`You cannot ban ${banTarget.user.tag} because their highest role is higher than or the same as your highest role.`)
	if(!banTarget.bannable) return sendErrorEmbed(`The bot is unable to ban ${banTarget.user.tag} because their highest role is higher than or the same as the bot's highest role.`)
	if(parseInt(args[1]), 10 && parseInt(args[1], 10) <= 7 && parseInt(args[1], 10) > 0) {
		let reason = args.slice(2).join(" ")
		if (!reason) reason = "Unknown"
		let banReason = reason + ` - Banned by ${message.author.tag} (${message.author.id})`
		message.guild.ban(banTarget, { days: parseInt(args[1], 10), reason: banReason })
		 .catch(error => sendErrorEmbed(`Error ${error} occured whilst trying to ban ${banTarget.user.tag}.`))
	  sendSuccessfulAction(`${message.author.tag} successfully banned **${banTarget.user.tag}**.\nReason: *${reason}*\nMessages purged: ${parseInt(args[1], 10)}d`)
	} else {
	let reason = args.slice(1).join(" ")
	if (!reason) reason = "Unknown"
  let banReason = reason + ` - Banned by ${message.author.tag} (${message.author.id})`
	message.guild.ban(banTarget, {reason: banReason })
	 .catch(error => sendErrorEmbed(`Error ${error} occured whilst trying to ban ${banTarget.user.tag}.`))
	sendSuccessfulAction(`${message.author.tag} successfully banned **${banTarget.user.tag}**.\nReason: *${reason}*`)
 }
}

if(parseInt(args[0], 10) && !message.mentions.members.first()) {
	const banTarget = bot.users.get(args[0])
	if(!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) return sendErrorEmbed("The bot is missing the **Ban members** permission.")
  if(message.guild.member(banTarget)) {
		const target = message.guild.member(banTarget);
		if(!message.guild.me.hasPermission('BAN_MEMBERS')) return sendErrorEmbed("The bot is missing the **Ban members** permission.")
		if(message.member.highestRole.comparePositionTo(target.highestRole) <= 0 && message.author.id != message.guild.owner.id) return sendUnsuccessfulAction(`You cannot ban ${target.user.tag} because their highest role is higher than or the same as your highest role.`)
    if(!target.bannable) return sendErrorEmbed(`The bot is unable to ban ${target.user.tag} because their highest role is higher than or the same as the bot's highest role.`)
		if(parseInt(args[1]), 10 && parseInt(args[1], 10) <= 7 && parseInt(args[1], 10) > 0) {
			let reason = args.slice(2).join(" ")
			if (!reason) reason = "Unknown"
			let banReason = reason + ` - Banned by ${message.author.tag} (${message.author.id})`
			message.guild.ban(banTarget, { days: parseInt(args[1], 10), reason: banReason })
			 .catch(error => sendErrorEmbed(`Error ${error} occured whilst using the **ban** command.`))
		  sendSuccessfulAction(`${message.author.tag} successfully banned **${target.user.tag}**.\nReason: *${reason}*\nMessages purged: ${parseInt(args[1], 10)}d`)
		} else {
		let reason = args.slice(1).join(" ")
		if (!reason) reason = "Unknown"
	  let banReason = reason + ` - Banned by ${message.author.tag} (${message.author.id})`
		message.guild.ban(target, {reason: banReason })
		 .catch(error => sendErrorEmbed(`Error ${error} occured whilst using the **ban** command.`))
		sendSuccessfulAction(`${message.author.tag} successfully banned **${target.user.tag}**.\nReason: *${reason}*`)
	  }
	} else {
		if(parseInt(args[1]), 10 && parseInt(args[1], 10) <= 7 && parseInt(args[1], 10) > 0) {
			let reason = args.slice(2).join(" ")
			if (!reason) reason = "Unknown"
			let banReason = reason + ` - Banned by ${message.author.tag} (${message.author.id})`
			message.guild.ban(args[0], { days: parseInt(args[1], 10), reason: banReason })
			 .catch(error => sendErrorEmbed(`Error ${error} occured whilst using the **ban** command.`))
		 sendSuccessfulAction(`${message.author.tag} successfully banned **${args[0]}**.\nReason: *${reason}*\nMessages purged: ${parseInt(args[1], 10)}d`)
		} else {
		let reason = args.slice(1).join(" ")
		if (!reason) reason = "Unknown"
	  let banReason = reason + ` - Banned by ${message.author.tag} (${message.author.id})`
		message.guild.ban(args[0], {reason: banReason })
		 .catch(error => sendErrorEmbed(`Error ${error} occured whilst using the **ban** command.`))
		sendSuccessfulAction(`${message.author.tag} successfully banned **${args[0]}**.\nReason: *${reason}*`)
	  }
	 }
 } else {
	 if (!message.mentions.users && !parseInt(args[0], 10) ) sendErrorEmbed("Incorrect arguments for **ban** command.\n**Usage:** `ban <user> [reason]`\n**Example:** `ban @user#0000 breaking rules`\n`ban 123456789012345678 breaking rules`")
  }
 },
};
