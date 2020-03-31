module.exports = {
  name: "ping",
  description: "Pong!",
  cooldown: 5,
  devOnly: false,
  disableable: true,
  aliases: ["pong"],
  execute(message, args) {
    message.reply("Pong!")
  }
}
