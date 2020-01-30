module.exports = {
	name: 'test',
	description: 'Test',
execute(message, bot, command, prefix, sendEmbed, sendSuccessfulAction, sendUnsuccessfulAction, sendErrorEmbed, developers) {

if (developers.includes(message.author.id)) return sendSuccessfulAction("Test successful.")

sendUnsuccessfulAction("Sorry, but only **Developers** can use this command.")


},
};
