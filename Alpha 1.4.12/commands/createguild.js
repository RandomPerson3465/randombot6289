module.exports = {
	name: 'createguild',
	description: 'Creates a guild',
execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, developers, cooldowncreateguild) {
if (cooldowncreateguild.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 60 seconds.`)
cooldowncreateguild.add(message.author.id);
setTimeout(() => {
	cooldowncreateguild.delete(message.author.id);
}, 60000);
args = args.slice(1);
if (!developers.includes(message.author.id)) return sendUnsuccessfulAction("Sorry, but only **Developers** can use this command.")
if (!args[0]) return sendErrorEmbed("Missing arguments for **createguild** command.\n**Usage:** `createguild <name>`\n**Example:** `createguild New Server`")
if (bot.guilds.size >= 10) return sendErrorEmbed("Cannot create guild, the bot is in too many guilds already.")
async function createGuild(bot, message) {
  try {
		const guildName = args.join(" ")
    const guild = await bot.user.createGuild(guildName);
    const defaultChannel = await guild.createChannel("general", {type: 'text'})
    const invite = await defaultChannel.createInvite();
    await message.author.send(`You have created a new Guild: ${invite.url}`);
    const role = await guild.createRole({ name:'Admin', permissions:['ADMINISTRATOR'] });
    await console.log(role.id)
  } catch (error) {
    console.error(error);
  }
}
createGuild(bot, message);

 },
};
