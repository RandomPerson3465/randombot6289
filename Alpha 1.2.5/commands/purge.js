module.exports = {
	name: 'purge',
	description: 'Deletes messages',
execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed) {
   args = args.slice(1);
   async function deleteMessages() {
   const d = parseInt(args[0], 10)
   if (!message.channel.permissionsFor(message.member).serialize().MANAGE_MESSAGES && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("You are missing the **Manage Messages** permission to use this command.")
   if (!message.channel.permissionsFor(message.guild.me).serialize().MANAGE_MESSAGES && !message.guild.me.hasPermission('ADMINISTRATOR') && message.guild.me.id != message.guild.owner.id) return sendErrorEmbed("The bot does not have the required permission to delete messages.")
   if (!d) return sendErrorEmbed("Missing arguments for **purge** command.\n**Usage:** `purge <messages>`\n**Example:** `purge 100`")
   if (d < 1 || d > 4096) return sendErrorEmbed("Argument error for **purge** command.\n`<messages>` argument must be **between 1 and 4096** inclusive.")
   const f = await message.channel.fetchMessages({ limit: d+1 })
   if (!f) return sendErrorEmbed("No messages were found to delete.")
   message.channel.bulkDelete(f)
    .catch(error => sendErrorEmbed(`Error **${error}** occured whilst trying to delete messages.`))
	console.log(`${d} messages were deleted in #${message.channel.name} (${message.channel.id}) in ${message.guild.name} (${message.guild.id}) by ${message.author.tag} (${message.member.id}) at ${new Date().getTime()}.`)
  }
  deleteMessages();
 },
};
