module.exports = {
	name: 'kick',
	description: 'Kicks a member',
execute(message, args, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed) {

args = args.slice(1);
if(!message.member.hasPermission('KICK_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("You are missing the **Kick members** permission to use this command.")
let t = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!t)
      return sendErrorEmbed("Missing arugments for **kick** command.\n**Usage:** `kick <user> [reason]`\n**Example:** `kick Person#123 breaking rules`")
    if(!t.kickable)
      return sendUnsuccessfulAction("The bot does not have the required premissions to kick this member.");
        if (message.member.highestRole.comparePositionTo(t.highestRole) <= 0 && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction(`You cannot kick **${t.user.tag}** because they have a higher or equal role compared to you.`);

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
		let r = reason + "- Kicked by " + message.member.id + "(" + message.author.tag + ")"
		t.kick(r)
		 .catch(error => sendErrorEmbed(`Error **${error}** occured whilst trying to kick ${t.user.tag}.`));
    sendSuccessfulAction(`${message.member} has successfully kicked **${t.user.tag}**.\n**Reason:** *${reason}*`)
		console.log(`${t.user.tag} (${t.user.id}) was kicked in guild ${message.guild.name} (${message.guild.id}) by ${message.author.tag} (${message.member.id}) at ${new Date().getTime()} for reason ${reason}.`)
	},
};
