module.exports = {
	name: 'channel',
	description: 'Creates or deletes a channel.',
execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, cooldownchannel) {
	if (cooldownchannel.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 5 seconds.`)
	cooldownchannel.add(message.author.id);
	setTimeout(() => {
		cooldownchannel.delete(message.author.id);
	}, 5000)
  args = args.slice(1);
  if (!message.member.hasPermission('MANAGE_CHANNELS') && !message.member.hasPermission('ADMINISTRATOR') && args[0] != "delete") return sendUnsuccessfulAction("You are missing the **Manage channels** permission to use this command.")
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !message.guild.me.hasPermission('ADMINISTRATOR') && args[0] != "delete") return sendErrorEmbed("The bot is missing the **Manage channels** permission.")
  if (!args[0]) return sendErrorEmbed("Missing arguments for **channel** command.\n**Usage:** `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
  if (!["create","delete"].includes(args[0].toLowerCase())) return sendErrorEmbed("Incorrect arguments for **channel** command.\n**Usage:** `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
  if (args[0].toLowerCase() === "create") {
    if (!args[1]) return sendErrorEmbed("Missing arguments for **channel** command.\n**Usage:** `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
    if (!["text","voice"].includes(args[1].toLowerCase())) return sendErrorEmbed("Incorrect arguments for **channel** command.\n**Usage:** `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
    if (!args[2]) return sendErrorEmbed("Missing arguments for **channel** command.\n**Usage:** `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
    var count = parseInt(args[3], 10)
    if (!count) count = 1
    if (count < 1 || count > 499) return sendErrorEmbed("Argument error for **channel** command.\n`[count]` must be **between 1 and 499** inclusive.")
    if (message.guild.channels.array().length + count > 500) return sendErrorEmbed(`Cannot create ${count} channels, servers may only have a maximum of 500 channels.`)
		if (count > 10 && !args[4]) return sendEmbed("ffff00","Confirmation",`Are you sure you want to create ${count} channels?\nSend \`channel create <text/voice> <name> ${count} confirm\` to confirm.`)
		if (count > 10 && args[4].toLowerCase() != "confirm") return sendEmbed("ffff00","Confirmation",`Are you sure you want to create ${count} channels?\nSend \`channel create <text/voice> <name> ${count} confirm\` to confirm.`)

    for (i=0; i<count; i++) {
      message.guild.createChannel(args[2], { type: args[1].toLowerCase() })
       .catch(error => console.log(error))
    }
    sendSuccessfulAction(`${message.author} successfully created ${count} channels.`)
  }
  if (args[0].toLowerCase() === "delete") {
    if (!args[1]) return sendErrorEmbed("Missing arguments for **channel** command.\n**Usage:** `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
    var targetChannel = message.guild.channels.find(channel => channel.name === args[1]) || message.mentions.channels.first()
    if (message.mentions.channels.first()) {
      if (message.mentions.channels.first() != args[1]) return sendErrorEmbed("Incorrect arguments for **channel** command.\n**Usage:** `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
    }
    if (!targetChannel) return sendErrorEmbed("Missing arguments for **channel** command.\n**Usage:** `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
    if (!targetChannel.permissionsFor(message.member).serialize().MANAGE_CHANNELS && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction(`You don't have permission to delete ${targetChannel}.`)
    if (!targetChannel.permissionsFor(message.guild.me).serialize().MANAGE_CHANNELS && !message.guild.me.hasPermission('ADMINISTRATOR') && message.guild.me.id != message.guild.owner.id) return sendUnsuccessfulAction(`The bot doesn't have permission to delete ${targetChannel}.`)
    let targetChannelName = targetChannel.name
    let reason = args.slice(2).join(" ")
    if (!reason) reason = "Unknown"
    let deleteReason = reason + ` - Deleted by ${message.author.tag} (${message.member.id})`
    targetChannel.delete(deleteReason)
     .catch(error => sendErrorEmbed(`Error ${error} occured whilst trying to delete ${targetChannel}.`))
    sendSuccessfulAction(`${message.author.tag} successfully deleted ${targetChannelName}. `)
  }
 },
}
