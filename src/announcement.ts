import * as Discord from "discord.js";
import client from "./app";
import { default as meetings, formatMeeting, IMeeting } from "./meetings";

export default function announce(message: Discord.Message) {
    const reply = {
        embed: {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL,
            },
            color: 3447003,
            description: "Lead meeting times and general meeting times",
            fields: Array.from(meetings.entries())
                .map(([name, meeting]) =>
                    ({ name: `__${name}__`, value: formatMeeting(meeting) })),
            footer: {
                text: "How do you prove that you exist...?",
                icon_url: "http://www.hardcoregamer.com/wp-content/uploads/2016/05/world-of-ff-vivi.jpg",
            },
            timestamp: new Date(),
            title: "SIG-Game meeting times",
        },
    };
    message.channel.send(reply);
}
