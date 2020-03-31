module.exports = {
  name: "eval",
  description: "Evalulates JavaScript code",
  devOnly: true,
  disableable: false,
  cooldown: 0,
  execute(message, args) {
    if (!args.length)
      return message.reply("There is no code for the bot to evaluate!");
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      if (evaled.length > 1900) evaled = evaled.slice(0, 1900 - evaled.length)
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
};
