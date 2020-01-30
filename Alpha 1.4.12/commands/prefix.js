module.exports = {
  name: 'prefix',
  description: 'Changes the bot prefix',
execute(message, bot, args, command, prefixes, prefix, fs, sendEmbed, sendErrorEmbed, sendSuccessfulAction, sendUnsuccessfulAction, cooldownprefix) {
if (cooldownprefix.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 10 seconds.`)
cooldownprefix.add(message.author.id);
setTimeout(() => {
  cooldownprefix.delete(message.author.id);
}, 10000);
args = args.slice(1);
if(!message.member.hasPermission('MANAGE_GUILD') && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("You are missing the **Manage server** permission to use this command.")
const p = args[0];
if (!p) return sendErrorEmbed("Missing arugments for **prefix** command.\n**Usage:** `prefix <prefix>`\n**Example:** `prefix !`")
if (p.length > 8) return sendErrorEmbed("Argument error for **prefix** command.\n`<prefix>` cannot be longer than 8 characters.")
  prefixes[message.guild.id].prefix = p;
  fs.writeFile('./data/prefixes.json', JSON.stringify(prefixes,null,2), (err) => {
    if (err) console.log(err)
  })
  sendSuccessfulAction(`${message.member} changed the bot prefix for **${message.guild.name}** to \`${p}\``)
 },
};
