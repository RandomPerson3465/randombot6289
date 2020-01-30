module.exports = {
	name: 'howgay',
	description: 'Test how gay something is',
	 execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, cooldownhowgay) {
		 if (cooldownhowgay.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 0.8 second.`)
		 cooldownhowgay.add(message.author.id);
		 setTimeout(() => {
			 cooldownhowgay.delete(message.author.id);
		 }, 800);
     args = args.slice(1);
     if (!args[0]) return sendErrorEmbed("Missing arguments for **howgay** command.\n**Usage:** `howgay <thing>`\n**Example:** `howgay Fortnite`")
     const target = args.join(" ");
     if (target.toLowerCase() === "fortnite") return sendEmbed("00ffff","How gay test",`${target} is 100% gay\n**Please do not take this seriously!**`)
     if (target.toLowerCase() === "minecraft") return sendEmbed("00ffff","How gay test",`${target} is 0% gay\n**Please do not take this seriously!**`)
     sendEmbed("00ffff","How gay test",`${target} is ${Math.round(Math.random()*100)}% gay\n**Please do not take this seriously!**`)
 },
}
