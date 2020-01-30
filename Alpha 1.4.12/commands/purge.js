module.exports = {
	name: 'purge',
	description: 'Deletes messages',
execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownpurge) {
	 if (cooldownpurge.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 10 seconds.`)
	 cooldownpurge.add(message.author.id);
	 setTimeout(() => {
		 cooldownpurge.delete(message.author.id);
	 }, 10000);
   args = args.slice(1);
   async function deleteMessages() {
   var d = parseInt(args[0], 10)
   if (!message.channel.permissionsFor(message.member).serialize().MANAGE_MESSAGES && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("You are missing the **Manage Messages** permission to use this command.")
   if (!message.channel.permissionsFor(message.guild.me).serialize().MANAGE_MESSAGES && !message.guild.me.hasPermission('ADMINISTRATOR') && message.guild.me.id != message.guild.owner.id) return sendErrorEmbed("The bot does not have the required permission to delete messages.")
   if (!d) return sendErrorEmbed("Missing arguments for **purge** command.\n**Usage:** `purge <messages>`\n**Example:** `purge 50`")
   if (d < 1 || d > 4096) return sendErrorEmbed("Argument error for **purge** command.\n`<messages>` argument must be **between 1 and 4096** inclusive.")
	 while (d >= 100) {
		 message.channel.bulkDelete(100, true)
			.catch(error => console.log(error))

     d = d - 100;
	 }
	 if (d == 0) return;
	 message.channel.bulkDelete(d, true)
		.catch(error => sendErrorEmbed(`Error **${error}** occured whilst trying to delete messages.`))
  }
  deleteMessages();
 },
};
