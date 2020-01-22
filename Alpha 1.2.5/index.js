const discord = require('discord.js')
const fs = require('fs')
const bot = new discord.Client()
const developers = []
const version = "Alpha 1.2.5 modification 2"
bot.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.on('ready', () => {
  console.log(`Bot has started!`)
	console.log(`Time: ${new Date().getTime()}`)
	console.log(`Version: ${version}`)
	console.log(`Developer count: ${developers.length}`)
	console.log(`Guild count: ${bot.guilds.size}`)
	console.log(`Total channels in guilds: ${bot.channels.size}`)
	console.log(`Total users in guilds: ${bot.users.size}`)
})

const prefix = ">>";

bot.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild) return;
	if (!message.channel.permissionsFor(message.guild.me).serialize().READ_MESSAGES || !message.channel.permissionsFor(message.guild.me).serialize().SEND_MESSAGES || !message.channel.permissionsFor(message.guild.me).serialize().READ_MESSAGE_HISTORY || !message.channel.permissionsFor(message.guild.me).serialize().EMBED_LINKS) return message.member.send("The bot is missing at least one permission in the channel you are using the bot in.\nRequired permissions: **Read messages, Send messages, Read message history, Embed links**")
  const args = message.content.slice(prefix.length).split(' ')
  const splitArgs = message.content.slice(prefix.length)
  const command = args[0].toLowerCase()

  function sendEmbed(a,b,c) {
  var embed = new discord.RichEmbed()
   .setColor("#" + a)
   .setTitle(b)
   .setTimestamp()
   .setDescription(c)
   message.channel.send(embed)
   }

   function sendErrorEmbed(a) {
    var embed = new discord.RichEmbed()
     .setColor("#ff0000")
     .setTitle("Technical Issue")
     .setDescription(a)
     message.channel.send(embed)
   }

	 function sendSuccessfulAction(a) {
		 var embed = new discord.RichEmbed()
		 	.setColor("#00ff00")
			.setTitle("Successful Action")
			.setDescription(a)
			message.channel.send(embed)
	 }

	 function sendUnsuccessfulAction(a) {
		 var embed = new discord.RichEmbed()
			.setColor("#ff0000")
			.setTitle("Unsuccessful Action")
			.setDescription(a)
			message.channel.send(embed)
	 }

   if (command === "embed") {
     bot.commands.get('embed').execute(message, args, version, splitArgs, command, prefix, sendEmbed, sendUnsuccessfulAction)
   }

   if (command === "version" || command === "about") {
     bot.commands.get('version').execute(message, version, command, prefix, sendEmbed, sendErrorEmbed)
}

   if (command === "ping") {
		 bot.commands.get('ping').execute(message, bot, command, prefix, sendEmbed, sendErrorEmbed)
	 }

	 if (command === "8ball" || command === "8-ball") {
		 bot.commands.get('8ball').execute(message, args, version, command, prefix, sendEmbed, sendUnsuccessfulAction)
	 }

	 if (command === "commands" || command === "help") {
		 bot.commands.get('help').execute(message, bot, command, prefix, sendEmbed, sendErrorEmbed)
	 }

	 if (command === "randomstring" || command === "random-string") {
		 bot.commands.get('randomstring').execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction)
	 }

	 if (command === "test") {
		 bot.commands.get('test').execute(message, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, developers)
	 }

	 if (command === "kick" || command === "remove-member") {
		 bot.commands.get('kick').execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed)

	 }

	 if (command === "ban") {
		 bot.commands.get('ban').execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed)
	 }

	 if (command === "clear" || command === "purge") {
		 bot.commands.get('purge').execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed)

	 }
  })

bot.login("")
