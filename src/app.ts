import * as dotenv from "dotenv";
dotenv.config();

import * as Discord from "discord.js";
import announce from "./announcement";
import reminders from "./meeting-reminder";
import music from "./music";
import responseObject from "./nonPrefix";
import cancel from "./cancel-meeting";
import send_pm from "./pm";
import { PREFIX, TOKEN } from "./vars";

const client = new Discord.Client();

const iRuNlInUX = `I'd just like to interject for a moment.  What you're referring to as Linux,
is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux.
Linux is not an operating system unto itself, but rather another free component
of a fully functioning GNU system made useful by the GNU corelibs, shell
utilities and vital system components comprising a full OS as defined by POSIX.

Many computer users run a modified version of the GNU system every day,
without realizing it.  Through a peculiar turn of events, the version of GNU
which is widely used today is often called \"Linux\", and many of its users are
not aware that it is basically the GNU system, developed by the GNU Project.

There really is a Linux, and these people are using it, but it is just a
part of the system they use.  Linux is the kernel: the program in the system
that allocates the machine's resources to the other programs that you run.
The kernel is an essential part of an operating system, but useless by itself;
it can only function in the context of a complete operating system.  Linux is
normally used in combination with the GNU operating system: the whole system
is basically GNU with Linux added, or GNU/Linux.  All the so-called "Linux"
distributions are really distributions of GNU/Linux.`;

// Silly "Playing with..." thing.
client.on("ready", () => {
  console.log(`[Started] ${new Date()}`);
  // make sure client is ready before creating and checking
  // reminders
  setInterval(reminders(), 1000);
  client.user.setGame(" with ACM");
});

// Vivi reads in messages and checks them against our responseObject to give a sweet reply
client.on("message", (message: Discord.Message) => {
  if (responseObject.has(message.content.toLowerCase())) {
    message.channel.send(responseObject.get(message.content.toLowerCase()));
    message.delete();
  }

  //BECAUSE OF MAYMAYS MY DOOOOOOOD
  const words = message.content.toLowerCase();
  if (words.includes("linux") && !(message.author.bot) && (Math.random() * 1) < 0.05) {
    message.channel.send(iRuNlInUX);
    return;
  }

});

// Welcome new users that join the server.
client.on("guildMemberAdd", (member: Discord.GuildMember) => {
  const guild = member.guild;
  guild.defaultChannel.send(`Welcome to ${guild.name} ${member.user}`);
});

// This will most likely be the main part of Vivi (for prefix maymays n stuff)
client.on("message", (message: Discord.Message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const [command, ...args] = message.content.substring(PREFIX.length).split(" ");
  const member = message.member;

  switch (command.toLowerCase()) {
    case "listemojis":
      // All the current costume emojis will be printed.
      if (message.channel.type === "dm") {
        message.channel.send("Emojis hurt me in pm's. Try again in the main channels.");
        return; //this block checks whether the command is issued from a dm
      }
      const emojiList = message.guild.emojis.map(e => e.toString()).join(" ");
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
      message.channel.send(`If you need help use the ${PREFIX}help command.`);
      break;
    case "foo":
      music(message);
      break;
    case "cancel":      
      // Joining args by spaces because of team groups such as "Public Relations"
      cancel(args.join(" "), message);
      break;
    default:
      if(message.channel.type === "dm") {
        message.channel.send(`You tried to use a command that doesn't exist, here's my list.`);
        send_pm(message);
      }
      else {
        message.channel.send(`Invalid command, use ${PREFIX}help for a list of commands.`);
      }  
   }
});

// Turn on the bot :)
export function run() {
  client.login(TOKEN).catch((e) => console.log(e));
}

export default client;
