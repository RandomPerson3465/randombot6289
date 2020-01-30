module.exports = {
	name: 'rps',
	description: 'Rock paper scissors',
	 execute(message, args, version, command, prefix, sendEmbed, sendErrorEmbed, cooldownrps) {
		if (cooldownrps.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 0.8 second.`)
		cooldownrps.add(message.author.id);
		setTimeout(() => {
			cooldownrps.delete(message.author.id);
		}, 800);
    args = args.slice(1);
    const rpsList = ["rock","paper","scissors"];
    if (!args[0] || !rpsList.includes(args[0].toLowerCase())) return sendErrorEmbed("Missing arguments for **rps** command.\n**Usage:** `rps <rock/paper/scissors>`\n**Example:** `rps rock`")
    const botResponse = rpsList[Math.floor(Math.random() * 3)]
    var result = "";
    if (args[0].toLowerCase() === botResponse) result = "Tie"
    if (args[0].toLowerCase() === "rock" && botResponse === "scissors") result = "You win!"
    if (args[0].toLowerCase() === "rock" && botResponse === "paper") result = "You lost! (The bot is not programmed to always win)"
    if (args[0].toLowerCase() === "scissors" && botResponse === "rock") result = "You lost! (The bot is not programmed to always win)"
    if (args[0].toLowerCase() === "scissors" && botResponse === "paper") result = "You win!"
    if (args[0].toLowerCase() === "paper" && botResponse === "scissors") result = "You lost! (The bot is not programmed to always win)"
    if (args[0].toLowerCase() === "paper" && botResponse === "rock") result = "You win!"
    sendEmbed("007fff","Rock, Paper, Scissors",`${message.author.tag}: **${args[0]}**\nBot: **${botResponse}**\nResult: **${result}**`)
 },
};
