module.exports = {
	name: 'credits',
	description: 'Bot credits',
execute(message, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, developers, cooldowncredits) {
if (cooldowncredits.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 3 seconds.`)
cooldowncredits.add(message.author.id);
setTimeout(() => {
	cooldowncredits.delete(message.author.id);
}, 3000);
var text = "";
for (i=0; i<developers.length; i++) {
	if (bot.users.get(developers[i])) text += `\n${bot.users.get(developers[i]).tag} - ${developers[i]}`
	if (!bot.users.get(developers[i])) text += `\nUnknown#0000 - ${developers[i]}`
}
if (text.length > 2048) return console.log("Embed text is too long!")
sendEmbed("00ff00","Bot credits:",text)

},
};
