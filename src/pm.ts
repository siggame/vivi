import * as Discord from "discord.js";
const config = require("../config.json");
import responseObject from "./nonPrefix";
import client from "./app";
import * as moment from "moment";

// commands that require a prefix
let userCommands: string[] = [
    "listemojis",
    "help"
];

// Send a message to the user requesting info.
export default function send_pm(message: Discord.Message) {
    let noPrefix = "";
    //
    responseObject.forEach(function (item, key) {
        noPrefix += key + "\n";
    });

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