import * as dotenv from "dotenv";
dotenv.config();

import * as Discord from "discord.js";
//import announce from "./announcement";
//import reminders from "./meeting-reminder";
import responseObject from "./nonPrefix";
import send_pm from "./pm";
import updateStatus, { Category, Status } from "./update";
//import cancel from "./cancel-meeting";
import { STATUS_CHANNEL_ID, PREFIX, TOKEN } from "./vars";

const client = new Discord.Client();

// Silly "Playing with..." thing.
client.on("ready", () => {
  console.log(`[Started] ${new Date()}`);
  // make sure client is ready before creating and checking
  // reminders
  //setInterval(reminders(), 1000);
  client.user.setGame(" with life");
});

// Vivi reads in messages and checks them against our responseObject to give a sweet reply
client.on("message", (message: Discord.Message) => {
  if (responseObject.has(message.content.toLowerCase())) {
    message.channel.send(responseObject.get(message.content.toLowerCase()));
  }
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
      message.channel.send("MegaMinerAI20 has finished and there are no more lead meetings for now!");
      break;
    case "vivi":
      message.channel.send(`If you need help use the ${PREFIX}help command.`);
      break;
    case "cancel":      
      message.channel.send("Can't cancel what doesn't exist! ;)");
      // Joining args by spaces because of team groups such as "Public Relations"
      //cancel(args.join(" "), message);
      break;
    case "update":
      // This is what Gerty did before in Slack: updates the SIG-Game status website
      // This command expects: '!update <category> to <status>; <title>: <message>
      if(message.channel.id !== STATUS_CHANNEL_ID) {
        message.channel.send("To update the status, please use this command within the appropriate status channel.");
        return;
      }
      // TODO: This should only work in the #statusupdate channel

      // We need to reassemble the arg string so that we can parse w/ a regex
      const argString: string = args.join(" ");
      // This is the regex to check and see if the message is correct
      const messageRegex: RegExp = /(.*) to (.*); (.+): (.+)$/i;

      if(!messageRegex.test(argString)) {
        message.channel.send("!update <component> to <status>; <title>: <description> - updates SIG-Game Status website");
      } else {
        // Do some more runtime checking to make sure their categories and stuff are correct
        const categories : string[] = ["arena", "webserver", "git", "food", "visualizer", "gameserver"];
        const statuses = ["OK", "Warning", "Down"];

        // Array w/ the executed regex, to capture the groups
        const newArgs = messageRegex.exec(argString);

        if(newArgs !== null) {
          const category: Category = newArgs[1] as Category;
          const status: Status = newArgs[2] as Status;
          const title: string = newArgs[3];
          const description: string = newArgs[4];
          if(categories.indexOf(category) < 0) {
            return message.channel.send("Please specify a valid category");
          }
          if(statuses.indexOf(status) < 0) {
            return message.channel.send("Please specify a valid status");
          }
          updateStatus(category, status, title, description).then((response) => {
            message.channel.send(`Updated status of ${category} to "${status}"`);
            return message.channel.send(`View the commit here: ${response.data.commit.html_url}`);
          }).catch((err) => {
            console.log("Updatestatus error ", err);
            return message.channel.send(`Something went wrong: ${err}`);
          });
        }

      }
      break;
    default:
      if(message.channel.type === "dm") {
        message.channel.send("You tried to use a command that doesn't exist, here's my list.");
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
