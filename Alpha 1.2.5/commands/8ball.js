module.exports = {
	name: '8ball',
	description: 'Ask the 8Ball a question!',
	 execute(message, args, version, command, prefix, sendEmbed, sendUnsuccessfulAction) {
     args = args.slice(1)
     const normalResponses = ["It is certain.","It is decidedly so.","Without a doubt.","Yes - definitely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Yes.","Signs point to yes.","Reply hazy, try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."]
     const yesNoOnlyResponses = ["It is certain.","It is decidedly so.","Without a doubt.","Yes - definitely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Yes.","Signs point to yes.","Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."]
     const rudeResponses = ["It is certain that you are gay","It is decidedly so, that you're a piece of shit","Without a doubt that you have small pp","Yes - you definitely gae","You may rely on your shit","As I see it, yes?!?!?!?!","Most likely, unlike your chances of getting a gf","Outlook good, unlike you","Yes?????????","Signs point to yes, you gay.","Reply hazy, so stfu","Shut up and don't ask me again.","I would tell you but your pp is 2 small","Cannot predict now because you're dumbdumb","Concentrate and shut the fuck up.","Don't count on your shit","My reply is NOOO!!!!!!","My sources say nah, you're never going to be cool","Outlook not so good, like your mom.","Very doubtful that you have an IQ greater than 40."]

     if (args.length < 2) return sendUnsuccessfulAction("Missing arguments for **8ball** command.\n**Usage:** \`8ball <normal/rude/yesNoOnly> <question>\`\n**Example:** \`8ball normal this is my question?\`")

     if(args[0].toLowerCase() === "normal" || args[0].toLowerCase() === "regular") return sendEmbed("444444","8-Ball Response :8ball:",`${message.author}, 8-Ball responded with **${normalResponses[Math.floor(Math.random()*20)]}**`)
     if(args[0].toLowerCase() === "rude") return sendEmbed("444444","8-Ball Response :8ball:",`${message.author}, 8-Ball responded with **${rudeResponses[Math.floor(Math.random()*20)]}**`)
     if(args[0].toLowerCase() === "yn" || args[0].toLowerCase() === "yesnoonly") return sendEmbed("444444","8-Ball Response :8ball:",`${message.author}, 8-Ball responded with **${yesNoOnlyResponses[Math.floor(Math.random()*15)]}**`)
     sendUnsuccessfulAction("Incorrect arguments for **8ball** command.\n**Usage:** \`8ball <normal/rude/yesNoOnly> <question>\`\n**Example:** \`8ball normal this is my question?\`")
    }
   };
