import * as moment from "moment";
import * as Discord from "discord.js";
import client from "./app";
const meetings = require("./meeting-times.json");

export default function announce(message: Discord.Message) {

    let reply = {
        "embed": {
            "author": {
                "name": client.user.username,
                "icon_url": client.user.avatarURL
            },
            "title": "SIG-Game meeting times",
            "description": "Lead meeting times and general meeting times",
            "timestamp": new Date(),
            "fields": [
                {
                    "name": "Public Relations",
                    "value": "Day: " + meetings.PR.day
                            + "\n" + "Starts: " + meetings.PR.startTime
                            + "\n" + "Ends: " + meetings.PR.endTime,
                },
                {
                    "name": "Visualizer",
                    "value": "Day: " + meetings.Visualizer.day
                            + "\n" + "Starts: " + meetings.Visualizer.startTime
                            + "\n" + "Ends: " + meetings.Visualizer.endTime,
                },
                {
                    "name": "Game/AI",
                    "value": "Day: " + meetings.Game.day
                    + "\n" + "Starts: " + meetings.Game.startTime
                    + "\n" + "Ends: " + meetings.Game.endTime,
                },
                {
                    "name": "Arena",
                    "value": "Day: " + meetings.Arena.day
                    + "\n" + "Starts: " + meetings.Arena.startTime
                    + "\n" + "Ends: " + meetings.Arena.endTime,
                },
            ],
            "footer": {
                "text": "Sliding in your DMs ;^)",
                "icon_url": "http://www.hardcoregamer.com/wp-content/uploads/2016/05/world-of-ff-vivi.jpg"
            }
        }
    };
    message.channel.send(reply);
}