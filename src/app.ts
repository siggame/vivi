import * as Discord from "discord.js";
import send_pm from "./pm";
import announce from "./announcement";
import responseObject from "./nonPrefix";
import meetings from "./meeting-reminder";
const config = require("../config.json");
const client = new Discord.Client();

export default client;

const meetingTimer = setInterval(meetings, 7000);

if(meetings)
{
  console.log("Meetings made it here?");
  clearInterval(meetingTimer);
}

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


  //BECAUSE OF MAYMAYS MY DOOOOOOOD
  let words = message.content.toLowerCase();
  if(words.includes("linux") && !(message.author.bot) && (Math.random()*1) < 0.05) {
      message.channel.send("I'd just like to interject for a moment.  What you're referring to as Linux,\n" +
          "is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux.\n" +
          "Linux is not an operating system unto itself, but rather another free component\n" +
          "of a fully functioning GNU system made useful by the GNU corelibs, shell\n" +
          "utilities and vital system components comprising a full OS as defined by POSIX.\n" +
          "\n" +
          "Many computer users run a modified version of the GNU system every day,\n" +
          "without realizing it.  Through a peculiar turn of events, the version of GNU\n" +
          "which is widely used today is often called \"Linux\", and many of its users are\n" +
          "not aware that it is basically the GNU system, developed by the GNU Project.\n" +
          "\n" +
          "There really is a Linux, and these people are using it, but it is just a\n" +
          "part of the system they use.  Linux is the kernel: the program in the system\n" +
          "that allocates the machine's resources to the other programs that you run.\n" +
          "The kernel is an essential part of an operating system, but useless by itself;\n" +
          "it can only function in the context of a complete operating system.  Linux is\n" +
          "normally used in combination with the GNU operating system: the whole system\n" +
          "is basically GNU with Linux added, or GNU/Linux.  All the so-called \"Linux\"\n" +
          "distributions are really distributions of GNU/Linux.");
      return;
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
        message.channel.send("Emojis hurt me in pm's. Try again in the main channels.")
        return; //this block checks whether the command is issued from a dm
      }
      const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
      message.channel.send(emojiList);
      break;
    case "help":
      message.channel.send("I've sent you a PM!");
      send_pm(message);
      break;
    case "meetings":
      announce(message);
      break;
    case "vivi":
      message.channel.send("If you need help use the " + config.prefix + "help command.");
      break;
  }
});

// Turn on the bot :)
client.login(config.token).catch((e) => console.log(e));
