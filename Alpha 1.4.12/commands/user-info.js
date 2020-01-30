module.exports = {
	name: 'user-info',
	description: 'Gets info on a user',
execute(message, args, bot, command, prefix, sendEmbed, sendErrorEmbed, cooldownuserinfo) {
if (cooldownuserinfo.has(message.author.id)) return message.channel.send(`${message.author}, you have already used this command in the past 3 seconds.`)
cooldownuserinfo.add(message.author.id);
setTimeout(() => {
	cooldownuserinfo.delete(message.author.id);
}, 3000);
args = args.slice(1);
if (!args[0]) return sendErrorEmbed("Missing arguments for **user-info** command.\n**Usage:** `user-info <user>`\n**Example:** `user-info 100000000000000000`\n`user-info @Person#0000`")
const targetUser = message.mentions.users.first() || bot.users.get(args[0])
if (message.mentions.users.first()) {
	if (message.mentions.users.first() != args[0].split("!").join("")) return sendErrorEmbed("Incorrect arguments for **user-info** command.\n**Usage:** `user-info <user>`\n**Example:** `user-info 100000000000000000\n`user-info @Person#0000`")
}
if (!targetUser) return sendErrorEmbed("The bot doesn't know who that is!")
if (!message.guild.member(targetUser)) {
	var avatarURL = targetUser.avatarURL
	if (!avatarURL) avatarURL = "*None*"
	const isBot = targetUser.bot
	const creationDate = targetUser.createdAt
	const creationDateUnix = Math.floor(targetUser.createdTimestamp / 1000)
	const userID = targetUser.id
	const userTag = targetUser.tag
	var status = targetUser.presence.status
	if (status == 'online') status = 'Online'
	if (status == 'idle') status = 'Idle'
	if (status == 'offline') status = 'Offline'
	if (status == 'dnd') status = 'Do Not Disturb'
	var playing = targetUser.presence.game
	var playingGame = ""
	if (!playing) {
		playingGame = "*None*"
	} else {
		playingGame = targetUser.presence.game.name
	}
	sendEmbed('444444','User info',`Name: **${userTag}**\nDiscord ID: **${userID}**\nIs a bot: **${isBot}**\nJoined Discord: **${creationDate}** (${creationDateUnix})\nAvatar link: ${avatarURL}\nStatus: **${status}**\nPlaying: **${playing}**\nIn server: **false**`)

} else {
	const member = message.guild.member(targetUser);
	var avatarURL = targetUser.avatarURL
	if (!avatarURL) avatarURL = "*None*"
	const isBot = targetUser.bot
	const creationDate = targetUser.createdAt
	const creationDateUnix = Math.floor(targetUser.createdTimestamp / 1000)
	const userID = targetUser.id
	const userTag = targetUser.tag
	var status = targetUser.presence.status
	if (status == 'online') status = 'Online'
	if (status == 'idle') status = 'Idle'
	if (status == 'offline') status = 'Offline'
	if (status == 'dnd') status = 'Do Not Disturb'
	const playing = targetUser.presence.game
	var playingGame = ""
	if (playing == null) {
		playingGame = "*None*"
	} else {
		playingGame = targetUser.presence.game.name
	}
  var highestColouredRole = ""
  if (member.colorRole) {
	highestColouredRole = `<@&${member.colorRole.id}>`
} else {
  highestColouredRole = '*None*'
}
	const memberColour = member.displayHexColor
	const nickname = member.displayName
  var highestRole = ""
	if (member.highestRole) {
		highestRole = `<@&${member.highestRole.id}>`
	} else {
		highestRole = "*None*"
	}
	var highestHoistedRole = ""
	if (member.hoistRole) {
	highestHoistedRole = `<@&${member.hoistRole.id}>`
} else {
	highestHoistedRole = '*None*'
}
	const joinDate = member.joinedAt
	const joinDateUnix  = Math.floor(member.joinedTimestamp / 1000)
	const muted = member.serverMute
	const deaf = member.serverDeaf
	sendEmbed('444444','User info',`Name: **${userTag}**\nDiscord ID: **${userID}**\nIs a bot: **${isBot}**\nJoined Discord: **${creationDate}** (${creationDateUnix})\nAvatar link: ${avatarURL}\nStatus: **${status}**\nPlaying: **${playing}**\nIn server: **true**\n\nJoined server: **${joinDate}** (${joinDateUnix})\nHighest role: ${highestRole}\nHighest hoisted role: ${highestHoistedRole}\nHighest colo(u)red role: ${highestColouredRole}\nColo(u)r on this server: ${memberColour}\nName in this server: **${nickname}**\nMuted server wide: **${muted}**\nDeafened server wide: **${deaf}**`)
}

 },
};
