module.exports = {
	name: 'spam',
	description: 'Spam messages',
execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, cooldownspam) {
	if (cooldownspam.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 5 minutes.`)
	cooldownspam.add(message.author.id);
	setTimeout(() => {
		cooldownspam.delete(message.author.id);
	}, 300000);
  args = args.slice(1);
	if (!message.channel.permissionsFor(message.member).serialize().MANAGE_MESSAGES && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("You are missing the **Manage messages** permission to use this command.")
	if (!message.channel.permissionsFor(message.guild.me).serialize().MANAGE_MESSAGES && !message.guild.me.hasPermission('ADMINISTRATOR') && message.guild.me.id != message.guild.owner.id) return sendErrorEmbed("The bot is missing the **Manage messages** permission.")
  if (args.length < 2) return sendErrorEmbed("Missing arguments for **spam** command.\n**Usage:** `spam <count> <message>`\nExample: `spam 100 this is my message`")
	var count = parseInt(args[0], 10);
	if (!count) sendErrorEmbed("Incorrect arguments for **spam** command.\n**Usage:** `spam <count> <message>`\nExample: `spam 100 this is my message`")
  if (count < 2 || count > 4096) return sendErrorEmbed("Argument error for **spam** command.\n`<count>` must be **between 2 and 4096** inclusive.")
	const spamMessage = args.slice(1).join(" ");
  for (i=0; i<count; i++) {
		message.channel.send(spamMessage)
  }
 },
};
