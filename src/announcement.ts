import * as Discord from "discord.js";
import client from "./app";

const meetings = new Map<string, IMeeting>([
    ["Arena", {
        day: "Saturday",
        endTime: "NOON",
        room: "CS 213",
        startTime: "8AM",
    }],
    ["Game/AI", {
        day: "Monday",
        endTime: "7PM",
        room: "Toomey 251",
        startTime: "6PM",
    }],
    ["General SIG-Game", {
        day: "Wednesday",
        room: "CS 207",
        startTime: "5PM",
    }],
    ["Public Relations", {
        day: "Monday",
        endTime: "7PM",
        room: "CS 213",
        startTime: "6PM",
    }],
    ["Visualizer", {
        day: "Tuesday",
        endTime: "6PM",
        room: "TBA",
        startTime: "5PM",
    }],
    ["Web", {
        day: "Wednesday",
        endTime: "7PM",
        room: "Refer to lead",
        startTime: "6PM",
    }],
]);

interface IMeeting {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    room: string;
    startTime: string;
    endTime?: string;
}

function formatMeeting(meeting: IMeeting): string {
    let formatted = `**Day**: ${meeting.day}` +
        `\n**Room**: ${meeting.room}` +
        `\n**Starts**: ${meeting.startTime}`;
    if (meeting.endTime) {
        formatted += `\n**Ends**: ${meeting.endTime}`;
    }
    return formatted;
}

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
