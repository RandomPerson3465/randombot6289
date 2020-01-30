module.exports = {
	name: 'eval',
	description: 'Evaluates code',
execute(message, args, discord, fs, bot, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, developers) {
args = args.slice(1);
if (developers[0] != message.author.id) return sendUnsuccessfulAction("Sorry, but only **Bot owners** can use this command.")
if (!message.channel.permissionsFor(message.guild.me).serialize().ATTACH_FILES) return sendErrorEmbed("The bot is missing the **Attach files** permission.")
if (!args[0]) return sendErrorEmbed("Missing arguments for **eval** command.\n**Usage:** `eval <code>`\n**Example:** `eval 2+2`")
try {
var result = eval(args.join(' '))
if (typeof result != "string") {
	result = require("util").inspect(result)
}
if (!result) return sendErrorEmbed("No result")
if (result.length > 2048) {
	fs.writeFileSync("./temp/eval.txt", result);
	message.channel.send(new discord.Attachment("./temp/eval.txt"))
} else {
sendEmbed("00ff00","Result",`${result}`);
}
} catch (error) {
	sendErrorEmbed(`${error}`)
}

 },
};
