import * as Discord from "discord.js";
const config = require("../config.json");
const client = new Discord.Client();
import send_pm from "./pm";
import responseObject from "./nonPrefix";

export default client;

// Some silly responses that don't require a prefix to use.

// Silly "Playing with..." thing.
client.on("ready", () => {
  console.log(`[Started] ${new Date()}`);
  client.user.setGame(" with ACM")
});

// Vivi reads in messages and checks them against our responseObject to give a sweet reply
client.on("message", (message: Discord.Message) => {
  if(responseObject.has(message.content.toLowerCase())) {
    message.channel.send(responseObject.get(message.content.toLowerCase()));
  }
});

// Welcome new users that join the server.
client.on("guildMemberAdd", (member: Discord.GuildMember) => {
  const guild = member.guild;
  guild.defaultChannel.send("Welcome to " + guild.name + " " + member.user);
});

// This will most likely be the main part of Vivi (for prefix maymays n stuff)
client.on("message", (message: Discord.Message) => {
  if(!message.content.startsWith(config.prefix) || message.author.bot) return;

  let msg = message.content.substring(config.prefix.length).split(" ");
  const args = message.content.split(" ").slice(1).join(" ");
  const member = message.member;

  switch(msg[0].toLowerCase()) {
      case "listemojis":
      // All the current costume emojis will be printed.
      if (message.channel.type === "dm") {
        message.channel.send("Emojis hurt me in a pm. Try again in the main channels")
        return; //this block checks whether the command is issued from a dm
      }
      const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
      message.channel.send(emojiList);
      break;
    case "help":
      message.channel.send("I've sent you a PM!");
      send_pm(message);
      break;

    case "vivi":
      message.channel.send("Those black mages and I. Are we... the same?");
      break;
  }
});

// Turn on the bot :)
client.login(config.token).catch((e) => console.log(e));
