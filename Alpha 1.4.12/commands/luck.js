module.exports = {
	name: 'luck',
	description: 'Test your luck',
	 execute(message, bot, command, prefix, sendEmbed, cooldownluck) {
		if (cooldownluck.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 0.8 second.`)
		cooldownluck.add(message.author.id);
		setTimeout(() => {
			cooldownluck.delete(message.author.id);
		}, 800);
    const yourLuck = Math.round(Math.random() * 100)
		if (yourLuck < 20) return sendEmbed('ff0000','Your luck',`${message.author}, your luck is ${yourLuck}%`)
		if (yourLuck > 19 && yourLuck < 40) return sendEmbed('ff7f00','Your luck',`${message.author}, your luck is ${yourLuck}%`)
		if (yourLuck > 39 && yourLuck < 60) return sendEmbed('ffff00','Your luck',`${message.author}, your luck is ${yourLuck}%`)
		if (yourLuck > 59 && yourLuck < 80) return sendEmbed('7fff00','Your luck',`${message.author}, your luck is ${yourLuck}%`)
		if (yourLuck > 79 && yourLuck != 100) return sendEmbed('00a000','Your luck',`${message.author}, your luck is ${yourLuck}%`)
		if (yourLuck = 100) return sendEmbed('00a000','Your luck',`${message.author}, your luck is ${yourLuck}% :four_leaf_clover:`)
 },
}
