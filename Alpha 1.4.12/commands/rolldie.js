module.exports = {
	name: 'rolldie',
	description: 'Rolls dice',
	 execute(message, bot, args, command, prefix, sendEmbed, sendErrorEmbed, sendUnsuccessfulAction, cooldownrolldie) {
		 if (cooldownrolldie.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 0.8 second.`)
		 cooldownrolldie.add(message.author.id);
		 setTimeout(() => {
			 cooldownrolldie.delete(message.author.id);
		 }, 800);
     args = args.slice(1);
     const dice = "⚀⚁⚂⚃⚄⚅";
     var count = args[0];
     var outcome = ""
     const result = Math.floor(Math.random()*6)
     if (!count) count = "1";
     if (!parseInt(count, 10)) return sendErrorEmbed('Incorrect argument for **rolldie** command.\n**Usage:** `rolldie [count]`\n**Example:** `rolldie 5`\n`rolldie`')
     if (parseInt(count, 10) > 2000 || parseInt(count, 10) < 1) return sendErrorEmbed("Argument error for **rolldie** command.\n`[count]` must be **between 1 and 2000** inclusive.")
     if (parseInt(count, 10) > 25 && !message.channel.permissionsFor(message.member).serialize().MANAGE_MESSAGES && !message.member.hasPermission('ADMINISTRATOR') && message.member.id != message.guild.owner.id) return sendUnsuccessfulAction("To prevent spamming, only members with **Manage messages** permission may roll more than 25 dice.")
     if (count == 1) {
       sendEmbed("007fff",`Rolled 1 die`,`You rolled: ${result + 1} ${dice[result]}`)
     } else {
       for (i=0;i<count;i++) {
         outcome = outcome + dice[Math.floor(Math.random()*6)]
       }
       sendEmbed("003f7f",`Rolled ${count} dice`,`You rolled: ${outcome}`)
     }
   },
 }
