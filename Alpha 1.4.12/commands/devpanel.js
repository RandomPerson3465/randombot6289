module.exports = {
	name: 'devpanel',
	description: 'The developer panel',
execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, developers, cooldowndevpanel) {
if (cooldowndevpanel.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 0.8 second.`)
cooldowndevpanel.add(message.author.id);
setTimeout(() => {
	cooldowndevpanel.delete(message.author.id);
}, 800);
args = args.slice(1);
if (!developers.includes(message.author.id)) return sendUnsuccessfulAction("Sorry, but only **Developers** can use this command.")
if (!args[0]) return sendEmbed("00ff00","Command list","Regular commands: `8ball`,`ban`,`cat`,`channel`,`coinflip`,`credits`,`delete-all-channels`,`dog`,`embed`,`help`,`howgay`,`kick`,`luck`,`ping`,`prefix`,`purge`,`randomstring`,`rolldie`,`rps`,`slowmode`,`spam`,`user-info`,`version`\nDeveloper commands: `api`,`createguild`,`devpanel`,`eval`,`setactivity`,`test`,`time`\nDo `devpanel <command>` for more info.")

const l = args[0].toLowerCase();

if (l === "8ball") return sendEmbed("444444","Command info","Name: 8ball\nDescription: Ask the 8-ball a question.\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `8ball [normal/rude/yesNoOnly] <question>`\n`normal`: The regular 8-ball.\n`rude`: Makes the 8-ball respond rudely. :warning: Contains profanity!\n`yesNoOnly`: Answers can only be affirmative or negative.")
if (l === "ban") return sendEmbed("444444","Command info","Name: ban\nDescription: Bans a user.\nPermissions required: Ban members\nBot requires: Ban members, Send messages, Embed links\nUsage: `ban <user> [reason]`")
if (l === "cat") return sendEmbed("444444","Command info","Name: cat\nDescription: Gets a random cat from random.cat\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `cat`")
if (l === "channel") return sendEmbed("444444","Command info","Name: channel\nDescription: Creates or deletes channels, will ask for confirmation if more than 10 channels.\nPermissions required: Manage channels\nBot requires: Manage channels, Send messages, Embed links\nUsage: `channel create <text/voice> <name> [count]`\n`channel delete <channel> [reason]`")
if (l === "coinflip") return sendEmbed("444444","Command info","Name: coinflip\nDescription: Flips a coin, returns heads or tails.\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `coinflip [heads/tails]`")
if (l === "credits") return sendEmbed("444444","Command info","Name: credits\nDescription: Lists the bot developers\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `credits`")
if (l === "delete-all-channels") return sendEmbed("444444","Command info","Name: delete-all-channels\nDescription: Deletes all channels in a server, will ask for confirmation\nPermissions required: Administrator\nBot requires: Administrator\nUsage: `delete-all-channels`")
if (l === "dog") return sendEmbed("444444","Command info","Name: dog\nDescription: Gets a random dog from random.dog\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `dog`")
if (l === "embed") return sendEmbed("444444","Command info","Name: embed\nDescription: Sends a rich embed.\nPermissions required: Manage messages, Embed links\nBot requires: Send messages, Embed links\nUsage: `embed [color],[title],<description>` (seperated by commas)")
if (l === "help") return sendEmbed("444444","Command info","Name: help\nDescription: Lists commands or gives information on one.\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `help [command]`")
if (l === "howgay") return sendEmbed("444444","Command info","Name: howgay\nDescription: Tests how \"gay\" someone/something is.\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `howgay <person or thing>`")
if (l === "kick") return sendEmbed("444444","Command info","Name: kick\nDescription: Kicks a member.\nPermissions required: Kick members\nBot requires: Kick members, Send messages, Embed links\nUsage: `kick <member> [reason]`")
if (l === "luck") return sendEmbed("444444","Command info","Name: luck\nDescription: Tests your luck.\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `luck`")
if (l === "ping") return sendEmbed("444444","Command info","Name: ping\nDescription: Checks the bot response time\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `ping`")
if (l === "prefix") return sendEmbed("444444","Command info","Name: prefix\nDescritption: Changes the bot prefix\nPremissions required: Manage server\nBot requires: Send messages, Embed links\nUsage: `prefix <prefix>`")
if (l === "purge") return sendEmbed("444444","Command info","Name: purge\nDescription: Bulk deletes messages.\nPermissions required: Manage messages\nBot requires: Manage messages, Send messages, Embed links\nUsage: `purge <message count>`")
if (l === "randomstring") return sendEmbed("444444","Command info","Name: randomstring\nDescription: Generates a random string. **Do not use them as passwords!!!**\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `randomstring <length>`")
if (l === "rolldie") return sendEmbed("444444","Command info","Name: rolldie\nDescription: Rolls 6 sided dice\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `rolldie [count]`")
if (l === "rps") return sendEmbed("444444","Command info","Name: rps\nDescription: Play rock, paper, scissors with the bot (not rigged)\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `rps <rock/paper/scissors>`")
if (l === "slowmode") return sendEmbed("444444","Command info","Name: slowmode\nDescription: Changes a channel's slowmode\nPermissions required: Manage channels\nBot requires: Manage channels, Send messages, Embed links\nUsage: `slowmode <channel> <duration>`")
if (l === "spam") return sendEmbed("444444","Command info","Name: spam\nDescription: Spams messages\nPremissions required: Manage messages\nBot requires: Manage messages, Send messages, Embed links\nUsage: `spam <count> <message>`")
if (l === "user-info") return sendEmbed("444444","Command info","Name: user-info\nDescription: Gets information about a user.\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `user-info <user>`")
if (l === "version") return sendEmbed("444444","Command info", "Name: version\nDescription: The current bot version.\nPermissions required: None\nBot requires: Send messages, Embed links\nUsage: `version`")

if (l === "api") return sendEmbed("660000","Command info","Name: api\nDescription: Gets data from an API.\nPermissions required: Developer\nBot requires: Send messages, Embed links, Attach files\nUsage: `api <url>`")
if (l === "createguild") return sendEmbed("660000","Command info","Name: createguild\nDescription: Creates a guild\nPermissions required: Developer\nBot requires: None\nUsage: `createguild <name>`")
if (l === "devpanel") return sendEmbed("660000","Command info","Name: devpanel\nDescription: The developer help screen.\nPermissions required: Developer\nBot requires: Send messages, Embed links\nUsage: `devpanel [command]`")
if (l === "eval") return sendEmbed("660000","Command info","Name: eval\nDescription: Evaluates code\nPermissions required: Bot owner\nBot requires: Send messages, Embed links, Attach files\nUsage: `eval <code>`")
if (l === "setactivity") return sendEmbed("660000","Command info","Name: setactivity\nDescription: Changes the bot's activity\nPermissions required: Developer\nBot requires: Send messages, Embed links\nUsage: `setactivity <type> <status>`")
if (l === "test") return sendEmbed("660000","Command info","Name: test\nDescription: Tests if the bot can respond.\nPermissions required: Developer\nBot requires: Send messages, Embed links\nUsage: `test`")
if (l === "time") return sendEmbed("660000","Command info","Name: time\nDescription: Returns the UTC time.\nPermissions required: Developer\nBot requires: Send messages, Embed links\nUsage: `time`")
sendErrorEmbed("Command not found!")

 },
};
