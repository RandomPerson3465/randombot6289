module.exports = {
	name: 'ping',
	description: 'Pong!',
execute(message, bot, command, prefix, sendEmbed, sendErrorEmbed, cooldownping) {
if (cooldownping.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 2 seconds.`)
cooldownping.add(message.author.id);
setTimeout(() => {
	cooldownping.delete(message.author.id);
}, 2000);
	async function ping() {
	  const m = await message.channel.send({embed:{"title":"Pinging...","description":"Please wait.","color":16776960}})
    m.edit({embed:{"title":"Pong!","description":`Latency is **${m.createdTimestamp - message.createdTimestamp} millseconds.**\nAPI heartbeat is **${Math.round(bot.ping)} milliseconds.**`,"color":65280}})
}
ping()

},

};
