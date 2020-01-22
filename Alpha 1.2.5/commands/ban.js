module.exports = {
	name: 'ban',
	description: 'Bans a member',
execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed) {

args = args.slice(1);
if(!message.member.hasPermission('BAN_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("You are missing the **Ban members** permission to use this command.")
let t = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!t)
      return sendErrorEmbed("Missing arugments for **ban** command.\n**Usage:** `ban <user> [reason]`\n**Example:** `ban Person#123 breaking rules`")
    if(!t.bannable)
      return sendUnsuccessfulAction("The bot does not have the required premissions to ban this member.");
        if (message.member.highestRole.comparePositionTo(t.highestRole) <= 0 && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction(`You cannot ban **${t.user.tag}** because they have a higher or equal role compared to you.`);

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
		let r = reason + "- Banned by " + message.member.id + "(" + message.author.tag + ")"
		t.ban(r)
		 .catch(error => sendErrorEmbed(`Error **${error}** occured whilst trying to ban ${t.user.tag}.`));
    sendSuccessfulAction(`${message.member} has successfully banned **${t.user.tag}**.\n**Reason:** *${reason}*`)
    console.log(`${t.user.tag} (${t.user.id}) was banned in guild ${message.guild.name} (${message.guild.id}) by ${message.author.tag} (${message.member.id}) at ${new Date().getTime()} for reason ${reason}.`)
	},
};
