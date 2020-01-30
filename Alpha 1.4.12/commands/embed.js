module.exports = {
	name: 'embed',
	description: 'Sends an embed.',
	 execute(message, args, version, splitArgs, command, prefixes, sendEmbed, sendUnsuccessfulAction, cooldownembed) {
		if (cooldownembed.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 5 seconds.`)
		cooldownembed.add(message.author.id);
		setTimeout(() => {
			cooldownembed.delete(message.author.id);
		}, 5000);
    const split = (splitArgs.slice(prefixes[message.guild.id].prefix.length + command.length)).split(",")

		if(!message.channel.permissionsFor(message.member).serialize().EMBED_LINKS || !message.channel.permissionsFor(message.member).serialize().MANAGE_MESSAGES) return sendUnsuccessfulAction("You are missing the **Embed links** and/or **Manage messages** permissions to use this command.")

    if(!split[0]) return sendUnsuccessfulAction("Missing arguments for **embed** command.\n**Usage:** \`embed [hex color] [title] <text>\` (Sepreated by commas)\n**Example:** \`embed 00ff00,this is my title,this is my description\`")


    if(split.length === 1) {
      sendEmbed("00ff00","",split[0])
    }

    if(split.length === 2) {
      sendEmbed("00ff00",split[0],split[1])
    }

    if(split.length > 2) {
      sendEmbed(split[0],split[1],split[2])
    }
	},
};
