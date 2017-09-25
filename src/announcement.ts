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
            "color": 3447003,
            "title": "SIG-Game meeting times",
            "description": "Lead meeting times and general meeting times",
            "timestamp": new Date(),
            "fields": [
                {
                    "name": "__Arena__",
                    "value": "**Day**: " + meetings.Arena.day
                            + "\n**Room**: " + meetings.Arena.room
                            + "\n**Starts**: " + meetings.Arena.startTime
                            + "\n**Ends**: " + meetings.Arena.endTime,
                },
                {
                    "name": "__Game/AI__",
                    "value": "**Day**: " + meetings.Game.day
                            + "\n**Room**: " + meetings.Game.room
                            + "\n**Starts**: " + meetings.Game.startTime
                            + "\n**Ends**: " + meetings.Game.endTime,
                },
                {
                    "name": "__General SIG-Game__",
                    "value": "**Day**: " + meetings.General.day
                            + "\n**Room**: " + meetings.General.room
                            + "\n**Starts**: " + meetings.General.startTime
                },
                {
                    "name": "__Public Relations__",
                    "value": "**Day**: " + meetings.PR.day
                            + "\n**Room**: " + meetings.PR.room
                            + "\n**Starts**: " + meetings.PR.startTime
                            + "\n**Ends**: " + meetings.PR.endTime,
                },
                {
                    "name": "__Visualizer__",
                    "value": "**Day**: " + meetings.Visualizer.day
                            + "\n**Room**: " + meetings.Visualizer.room
                            + "\n**Starts**: " + meetings.Visualizer.startTime
                            + "\n**Ends**: " + meetings.Visualizer.endTime,
                },
                {
                    "name": "__Web__",
                    "value": "**Day**: " + meetings.Web.day
                            + "\n**Room**: " + meetings.Web.room
                            + "\n**Starts**: " + meetings.Web.startTime
                            + "\n**Ends**: " + meetings.Web.endTime,
                }
            ],
            "footer": {
                "text": "How do you prove that you exist...?",
                "icon_url": "http://www.hardcoregamer.com/wp-content/uploads/2016/05/world-of-ff-vivi.jpg"
            }
        }
    };
    message.channel.send(reply);
}