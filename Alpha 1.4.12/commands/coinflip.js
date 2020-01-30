module.exports = {
	name: 'coinflip',
	description: 'Flip a coin',
	 execute(message, args, version, command, prefix, sendEmbed, sendErrorEmbed, cooldowncoinflip) {
		if (cooldowncoinflip.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 0.8 second.`)
		cooldowncoinflip.add(message.author.id);
		setTimeout(() => {
			cooldowncoinflip.delete(message.author.id)
		}, 800)
    args = args.slice(1);
    const outcomes = ["heads","tails"]
    const result = outcomes[Math.round(Math.random())]
    if (!args[0]) return sendEmbed("007fff","Coin Flip",`Result: **${result}**`)
    if (!outcomes.includes(args[0].toLowerCase())) return sendErrorEmbed("Incorrect arguments for **coinflip** command.\n**Usage:** `coinflip [heads/tails]`\n**Example:** `coinflip heads`\n`coinflip`")
    if (args[0].toLowerCase() != result) return sendEmbed("ff0000","Coin Flip",`You guessed: **${args[0]}**\nActual result: **${result}** (Incorrect)`)
    if (args[0].toLowerCase() === result) return sendEmbed("00ff00","Coin Flip",`You guessed: **${args[0]}**\nActual result: **${result}** (Correct)`)
 },
};
