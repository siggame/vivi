
import * as Discord from "discord.js";
import * as moment from "moment";

import client from "./app";
import meetings from "./meetings";
import { GUILD_NAME } from "./vars";

interface ITeam {
  channel?: Discord.Channel;
  role?: Discord.Role | string;
}

export default function prepareReminders() {
  // get the siggame server
  const server = client.guilds.find((guild) => guild.name === GUILD_NAME);

  const teams = new Map<string, ITeam>([
    ["AI", {
      channel: client.channels.get("353334140734799874"),
      role: server.roles.find((role) => role.name === "AI"),
    }],
    ["Arena", {
      channel: client.channels.get("275717152168869899"),
      role: server.roles.find((role) => role.name === "Arena"),
    }],
    ["Game", {
      channel: client.channels.get("362737004825542656"),
      role: server.roles.find((role) => role.name === "Game"),
    }],
    ["General", {
      channel: client.channels.get("277107668483702784"),
      role: "@everyone",
    }],
    ["Public Relations", {
      channel: client.channels.get("277160918377562122"),
      role: server.roles.find((role) => role.name === "PR"),
    }],
    ["Random", {
      channel: client.channels.get("275704765957275648"),
      role: "@here",
    }],
    ["Visualizer", {
      channel: client.channels.get("276176062877007872"),
      role: server.roles.find((role) => role.name === "Visualizer"),
    }],
    ["Web", {
      channel: client.channels.get("275718920995078144"),
      role: server.roles.find((role) => role.name === "Web"),
    }],
  ]);

  return () => {
    // get current time
    const currentMoment = moment();
    for (const [teamName, { channel, role }] of teams) {
      // get the meeting for the corresponding team
      const meeting = meetings.get(teamName);
      if (meeting && channel && role) {
        const { day, room, times: [start, end] } = meeting;
        // Announce reminder the hour before the meeting
        // but if for some reason we missed moving the meeting times to
        // next week and it's not the hour before the meeting,
        // then just update the meeting times and don't send a message
        if (start.format("dddd") === day && start.diff(currentMoment, "minutes") < 0) {
          meeting.times.forEach((time) => time.add(1, "w"));
        } else if (start.format("dddd") === day && start.diff(currentMoment, "minutes") <= 60) {
          const message = `${role} ${teamName} has a meeting in ${start.diff(currentMoment, "minutes")} minutes!`
            + ` (${start.format("h:mm A")}) In ${room}`;
          // move next meeting time one week forward
          meeting.times.forEach((time) => time.add(1, "w"));
          (channel as Discord.TextChannel).send(message);
        }
      }
    }
  };
}
