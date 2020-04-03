// Require modules
const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config()
const config = require("./config.json")
const fs = require("fs")
const Keyv = require("keyv")
const keyv = new Keyv("sqlite://data/database.sqlite");
keyv.on("error", err => console.error("Keyv connection error:", err));
const disabledCommands = new Keyv("sqlite://data/database.sqlite", { namespace: "disabledCommands" })

client.on("ready", async () => {
  console.log(`Client is ready as ${client.user.tag}`)
})

// Client commands
client.commands = new Discord.Collection()

// Command cooldowns
client.cooldowns = new Discord.Collection()

const commandFiles = fs.readdirSync("./commands")
for (const file of commandFiles) {
  try {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
  } catch (e) {
    console.error(`Failed to load file ${file} due to ${e}.`)
  }
}

// Message Event
client.on("message", async message => {
  const { guild } = message
  if (message.author.bot || !guild || !guild.available) return; // Ignores messages from bots or DMs
  if (!message.channel.permissionsFor(guild.me).serialize().SEND_MESSAGES) return; // Ignores messages if the bot doesn't have permission to respond
  if (message.content.startsWith(config.prefix)) { // If the message starts with the bot prefix
    let args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args[0];
    args = args.slice(1) // Command arguments
    const recievedCommand = client.commands.get(command) || client.commands.find(c => c.aliases.includes(command))
    if (!recievedCommand) return;
    if (recievedCommand.devOnly && !config.devs.includes(message.author.id)) return; // Ignores developer commands used by non-devs
    const disabled = await disabledCommands.get(message.guild.id)
    if (disabled && disabled.includes(recievedCommand.name)) return; // Ignores disabled commands
    if (!client.cooldowns.has(recievedCommand.name)) {
      client.cooldowns.set(recievedCommand.name, new Discord.Collection())
    }
    const t = client.cooldowns.get(recievedCommand.name)
    const n = Date.now()
    const cd = Math.round(recievedCommand.cooldown * 1e3);
    if (t) {
      let e = 0;
      if (t.has(message.author.id)) {
        e = t.get(message.author.id) + cd;
      }
      if (n < e) {
        const l = Math.round((e - n) / 1e3);
        if (l === 0)
          return message.channel.send(
            "Please wait <1 second before reusing this command."
          );
        if (l === 1)
          return message.channel.send(
            "Please wait 1 second before reusing this command."
          );
        return message.channel.send(
          `Please wait ${l} seconds before resuing this command.`
        );
      }
    }
    try {
      recievedCommand.execute(message, args)
      if (t) t.set(message.author.id, n);
      setTimeout(() => {
        if (t) t.delete(message.author.id);
      }, cd);
    } catch (e) {
      console.error(`Failed to execute ${recievedCommand} because of ${e}.`)
      return message.reply("An error occured trying to execute that command.")
    }
  }
})

client.login(process.env.TOKEN)
