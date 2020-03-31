const Keyv = require("keyv")
const disabledCommands = new Keyv("sqlite://data/database.sqlite", { namespace: "disabledCommands" })
module.exports = {
  name: "disable",
  description: "Disables a command.",
  cooldown: 5,
  devOnly: false,
  disableable: false,
  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You can't use this command!") // Only server managers / administrators can use this command
    if (!args.length) return message.reply("Please specify a command to disable!")
    const command = message.client.commands.get(args[0]) || message.client.commands.find(c => c.aliases && c.aliases.includes(args[0]))
    if (!command) return message.reply("That command doesn't exist! Check your spelling and try again.")
    let disabled = await disabledCommands.get(message.guild.id)
    if (!disabled) {
      disabled = []
      await disabledCommands.set(message.guild.id, disabled)
    }
    if (disabled.includes(command.name)) return message.reply("That command is already disabled!")
    disabled.push(command.name)
    await disabledCommands.set(message.guild.id, disabled)
    return message.channel.send(`Successfully disabled command \`${command.name}\`.`)
  }
}
