module.exports = {
	name: 'setactivity',
	description: 'Changes the bot\'s activity',
execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, sendSuccessfulAction, sendUnsuccessfulAction, developers, cooldownsetactivity) {
if (cooldownsetactivity.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 12 seconds.`)
cooldownsetactivity.add(message.author.id);
setTimeout(() => {
	cooldownsetactivity.delete(message.author.id);
}, 12000);
args = args.slice(1);
if (!developers.includes(message.author.id)) return sendUnsuccessfulAction("Sorry, but only **Developers** can use this command.")
if (args.length < 2) return sendErrorEmbed("Missing arguments for **setactivity** command.\n**Usage:** `activity <type> <status>`\n**Example:** `setactivity playing This is my status`")
if (!["LISTENING","WATCHING","PLAYING"].includes(args[0].toUpperCase())) return sendErrorEmbed("Incorrect arguments for **setactivity** command.\n**Usage:** `activity <type> <status>`\n**Example:** `setactivity playing This is my status`")
const t = args[0].toUpperCase()
const status = args.slice(1).join(" ");
if (status.toLowerCase() === "none") {
	bot.user.setActivity('')
	 .catch(error => sendErrorEmbed(`Error ${error} occured whilst trying to change status.`))
	 sendSuccessfulAction(`${message.author} set the bot's activity to *none*`)
} else {
	bot.user.setActivity(status, {type: t})
   .catch(error => sendErrorEmbed(`Error ${error} occured whilst trying to change status.`))
	sendSuccessfulAction(`${message.author} set the bot's activity to *${t.toLowerCase()} ${status}*`)
}

 },
};
