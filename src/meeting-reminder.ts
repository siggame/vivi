
import * as Discord from "discord.js";
import * as moment from "moment";

import client from "./app";
import meetings from "./meetings";

interface IChannel {
  channel: Discord.Channel | undefined;
  role: string;
}

export default function prepareReminders() {
  // Current channels that is viewable to me (Dylan) and will use these to 
  // have Vivi @ the correct roles in these channels (To no disturb everyone in announcement channel)
  const channels = new Map<string, IChannel>([
    ["AI", {
      channel: client.channels.get("353334140734799874"),
      role: "@AI",
    }],
    ["Arena", {
      channel: client.channels.get("275717152168869899"),
      role: "@Arena",
    }],
    ["Game", {
      channel: client.channels.get("362737004825542656"),
      role: "@Game",
    }],
    ["General", {
      channel: client.channels.get("277107668483702784"),
      role: "@everyone",
    }],
    ["Public Relations", {
      channel: client.channels.get("277160918377562122"),
      role: "@PR",
    }],
    ["Random", {
      channel: client.channels.get("275704765957275648"),
      role: "@here",
    }],
    ["Visualizer", {
      channel: client.channels.get("276176062877007872"),
      role: "@Visualizer",
    }],
    ["Web", {
      channel: client.channels.get("275718920995078144"),
      role: "@Web",
    }],
  ]);

  return () => {
    // get current time
    const currentMoment = moment();
    for (const [teamName, { channel, role }] of channels) {
      // get the meeting for the corresponding team
      const meeting = meetings.get(teamName);
      if (meeting && channel) {
        const { day, room, times: [start, end] } = meeting;
        // Announce reminder the hour before the meeting
        // but if for some reason we missed moving the meeting times to
        // next week and it's not the hour before the meeting,
        // then just update the meeting times and don't send a message
        if (start.format("dddd") === day && start.diff(currentMoment, "minutes") < 0) {
          meeting.times.forEach((time) => time.add(1, "w"));
        } else if (start.format("dddd") === day && start.diff(currentMoment, "minutes") <= 60) {
          const message = `${role} ${teamName} meets in ${start.diff(currentMoment, "minutes")} minutes! (${start}) In ${room}`;
          // move next meeting time one week forward
          meeting.times.forEach((time) => time.add(1, "w"));
          (channel as Discord.TextChannel).send(message);
        }
      }
    }
  };
}
