module.exports = {
	name: 'cat',
	description: 'Gets an image of a cat',
execute(message, fetch, bot, command, prefix, sendErrorEmbed, cooldowncat) {
if (cooldowncat.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 2 seconds.`)
cooldowncat.add(message.author.id);
setTimeout(() => {
	cooldowncat.delete(message.author.id)
}, 2000)
async function getCat() {
	try {
	let request = await fetch('https://aws.random.cat/meow');
	let data = await request.json()
		message.channel.send(`${data.file}`)
	 } catch (error) {
	sendErrorEmbed(`Error ${error} occured trying to retrieve an image of a cat.`)
   }
  }
  getCat();
 },
};
