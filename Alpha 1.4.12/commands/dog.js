module.exports = {
	name: 'dog',
	description: 'Gets an image/video of a dog',
execute(message, fetch, bot, command, prefix, sendErrorEmbed, cooldowndog) {
if (cooldowndog.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 2 seconds.`)
cooldowndog.add(message.author.id);
setTimeout(() => {
	cooldowndog.delete(message.author.id);
}, 2000);

async function getDog() {
	try {
	let request = await fetch('https://random.dog/woof.json');
	let data = await request.json()
		message.channel.send(`${data.url}`)
	 } catch (error) {
	sendErrorEmbed(`Error ${error} occured trying to retrieve an image/video of a dog.`)
   }
  }
  getDog();
 },
};
