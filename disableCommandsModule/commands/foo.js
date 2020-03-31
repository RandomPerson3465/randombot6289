module.exports = {
  name: "foo",
  description: "",
  cooldown: 5,
  devOnly: false,
  disableable: true,
  execute(message, args) {
    message.channel.send("bar")
  }
}
