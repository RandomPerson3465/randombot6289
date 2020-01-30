module.exports = {
	name: 'time',
	description: 'Check the time',
execute(message, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, developers, cooldowntime) {
if (cooldowntime.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 0.8 second.`)
cooldowntime.add(message.author.id);
setTimeout(() => {
	cooldowntime.delete(message.author.id);
}, 800);

if (developers.includes(message.author.id)) return sendEmbed("000000","UTC Time :clock4:",`Current UTC time is ${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1 > 10 ? new Date().getUTCMonth() + 1 : "0" + (new Date().getUTCMonth() + 1).toString()}-${new Date().getUTCDate() > 9 ? new Date().getUTCDate() : "0" + new Date().getUTCDate()}T${new Date().getUTCHours() > 9 ? new Date().getUTCHours() : "0" + new Date().getUTCHours()}:${new Date().getUTCMinutes() > 9 ? new Date().getUTCMinutes() : "0" + new Date().getUTCMinutes()}:${new Date().getUTCSeconds() > 9 ? new Date().getUTCSeconds() : "0" + new Date().getUTCSeconds()}.${new Date().getUTCMilliseconds() > 99 ? new Date().getUTCMilliseconds() : new Date().getUTCMilliseconds() > 9 ? "0" + new Date().getUTCMilliseconds() : "00" + new Date().getUTCMilliseconds()}Z\nUnix Time is ${Math.floor(new Date().getTime()/1000)} seconds.`)

sendUnsuccessfulAction("Sorry, but only **Developers** can use this command.")

 },
};
