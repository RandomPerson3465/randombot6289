// Example of a command
module.exports = {
  name: "example", // The name of your command.
  description: "This is a command!", // The description of your command.
  cooldown: 5, // The cooldown for your command in seconds
  disableable: true, // Whether you could disable this command
  devOnly: false, // Whether or not this command is for bot developers only
  aliases: [], // The aliases for the command
  execute(message, args) {
    // Your code goes here
    /*
    message.channel.send("text") will send text
    message.author.id will return the ID of the user that sent the message
    message.guild.name will return the server's name
    message.member.roles.add("role object", "reason") will add a role to the member that sent the message
    message.member.roles.remove("role object", "reason") will remove a role from the member that sent the message
    */
  }
}
