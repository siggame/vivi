import * as Discord from "discord.js";
const config = require("../config.json");
const client = new Discord.Client();

// Some silly responses that don't require a prefix to use.
let responseObject = new Map<string, string | {file:string}>(
    [
        ["ayy", {file: "images/ayylmao.gif"}],
        ["pbjtime", {file: "images/pbjtime.gif"}],
        ["lenny", "( ͡° ͜ʖ ͡°)"],
        ["shrug", "¯\\_(ツ)_/¯"],
        ["justright", "✋😩👌"],
        ["tableflip", "(╯°□°）╯︵ ┻━┻"],
        ["unflip", "┬──┬﻿ ノ( ゜-゜ノ)" ],
    ]
);

// Current prefix commands.
let userCommands: string[] = [
    "listemojis",
    "help"
];

// Silly "Playing with..." thing.
client.on("ready", () => {
  console.log(`[Started] ${new Date()}`);
  client.user.setGame(' with ACM')
});

// Vivi reads in messages and checks them against our responseObject to give a sweet reply
client.on("message", (message: Discord.Message) => {
  let words = message.content.split(" ");
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

// Send a message to the user requesting info.
function send_pm(message: Discord.Message) {
  let noPrefix = "";
  //
  for(let key in responseObject) {
    noPrefix += key + "\n";
  }

  let hasPrefix ="";
  for(let key in userCommands) {
    hasPrefix += config.prefix + userCommands[key] +'\n';
  }

  // Using rich embed to format output, it looks really pretty
  // Guide if you're curious: https://anidiotsguide.gitbooks.io/discord-js-bot-guide/examples/using-embeds-in-messages.html
  let pm = {
    "embed": {
      "author": {
        "name": client.user.username,
        "icon_url": client.user.avatarURL
      },
      "title": client.user.username + " commands",
      "description": "A list of commands that " + client.user.username + " currently has.",
      "timestamp": new Date(),
      "fields": [
        {
          "name": "Without Prefix " + config.prefix,
          "value": "\n" + noPrefix
        },
        {
          "name": "With Prefix",
          "value": "\n" + hasPrefix
        },
        {
          "name": "Frequently Asked Questions",
          "value": "You can view our FAQ's here: https://github.com/siggame/vivi#faq"
        }
      ],
      "footer": {
        "text": "Sliding in your DMs ;^)",
        "icon_url": "http://www.hardcoregamer.com/wp-content/uploads/2016/05/world-of-ff-vivi.jpg"
      }
    }
  };
  message.author.send(pm);
}

// Turn on the bot :)
client.login(config.token).catch((e) => console.log(e));
