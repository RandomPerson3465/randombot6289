module.exports = {
	name: 'api',
	description: 'Retrieves data from an API',
execute(message, args, fetch, discord, bot, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, developers, cooldownapi) {
if (cooldownapi.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 15 seconds.`)
cooldownapi.add(message.author.id);
setTimeout(() => {
	cooldownapi.delete(message.author.id);
}, 15000);
args = args.slice(1);
if (!developers.includes(message.author.id)) return sendUnsuccessfulAction("Sorry, but only **Developers** can use this command.")
if (!message.channel.permissionsFor(message.guild.me).serialize().ATTACH_FILES) return sendErrorEmbed("The bot is missing the **Attach files** permission.")
if (!args[0]) return sendErrorEmbed("Missing arguments for **api** command.\n**Usage:** `api <url>`\n**Example:** `api https://example.com`")
async function getAPI() {
	try {
	let request = await fetch(args.join(""));
	let data = await request.json()
	let response = JSON.stringify(data)

	if (response.length > 2048) {
		fs.writeFileSync("./temp/apiresult.txt", response)
		message.channel.send(new discord.Attachment("./temp/apiresult.txt"))

	} else {
		sendEmbed("00ff00","Result",response)
	 }
  } catch (error) {
	sendErrorEmbed(error)
   }
  }

	getAPI()
 },
};
