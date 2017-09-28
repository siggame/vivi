import * as Discord from "discord.js";

import client from "./app";
import responseObject from "./nonPrefix";
import { PREFIX } from "./vars";

// commands that require a prefix
const userCommands: string[] = [
    "listemojis",
    "help",
    "meetings",
    "vivi",
];

// create these once
const noPrefix = Array.from(responseObject.keys()).join("\n");
const hasPrefix = userCommands.map((command) => `${PREFIX}${command}`).join("\n");

// Send a message to the user requesting info.
export default function send_pm(message: Discord.Message) {
    // Using rich embed to format output, it looks really pretty
    // Guide if you're curious: https://anidiotsguide.gitbooks.io/discord-js-bot-guide/examples/using-embeds-in-messages.html
    const pm = {
        embed: {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL,
            },
            color: 3447003,
            description: `A list of commands that ${client.user.username} currently has.`,
            fields: [
                {
                    name: `Without Prefix ${PREFIX}`,
                    value: `\n${noPrefix}`,
                },
                {
                    name: "With Prefix",
                    value: `\n${hasPrefix}`,
                },
                {
                    name: "Frequently Asked Questions",
                    value: "You can view our FAQ's here: https://github.com/siggame/vivi#faq",
                },
            ],
            footer: {
                text: "How do you prove that you exist...?",
                icon_url: "http://www.hardcoregamer.com/wp-content/uploads/2016/05/world-of-ff-vivi.jpg",
            },
            timestamp: new Date(),
            title: `${client.user.username} commands`,
        },
    };
    message.author.send(pm);
}
