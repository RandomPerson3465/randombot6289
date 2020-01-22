module.exports = {
	name: 'randomstring',
	description: 'Generate a random string',
execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction) {
  args = args.slice(1);
  const stringLen = parseInt(args[0],10);
  var string = "";
  var characters = " 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()-=_+[]{}|;':<>?,./"
  if (!stringLen) return sendErrorEmbed("Missing arguments for **randomstring** command.\n**Usage:** \`randomstring <length>\`\n**Example:** \`randomstring 20\`")
  if (stringLen < 1 || stringLen > 2048) return sendErrorEmbed("Argument error for **randomstring** command.\n\`<length>\` argument must be **between 1 and 2048** inclusive.")
	if (stringLen > 100 && !message.channel.permissionsFor(message.member).serialize().MANAGE_MESSAGES && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("To prevent spamming, only members with **Manage Messages** permission may generate strings longer than 100 characters.")


  for (i=0; i<stringLen; i++) {
    string += characters[Math.floor(Math.random()*characters.length)]
  }

  sendEmbed("ffff00","Random String",string)
 }
}
