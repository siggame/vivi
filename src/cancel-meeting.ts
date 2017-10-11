import * as moment from "moment";
import * as Discord from "discord.js";
import { GUILD_NAME } from "./vars";
import meetings from "./meetings";
import client from "./app";


export default function cancel(team: string, message: Discord.Message) {

  const server = client.guilds.find((guild) => guild.name === GUILD_NAME);

  interface ITeam {
    channel?: Discord.Channel;
    role?: Discord.Role | string;
  }

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
    ["Visualizer", {
      channel: client.channels.get("276176062877007872"),
      role: server.roles.find((role) => role.name === "Visualizer"),
    }],
    ["Web", {
      channel: client.channels.get("275718920995078144"),
      role: server.roles.find((role) => role.name === "Web"),
    }],
  ]);

  if(message.channel.type === "dm") {
    message.channel.send("You can't cancel a meeting in a direct message.");
    return;
  }
  
  const LeadRole: Discord.Role  = server.roles.find((role) => role.name === "Leads");
  const teamInfo = teams.get(team);  

  if(message.member.roles.has(LeadRole.id)) {
    const meeting = meetings.get(team);
    if(!meeting) {
      message.reply("Invalid team name, please check for any spelling errors.");
      return;
    }
    if(teamInfo) {
      const channel = teamInfo.channel;      
      (channel as Discord.TextChannel).send(`${teamInfo.role} there will be no meeting this week.`);
    }
    meeting.times.forEach((time) => time.add(1, "w"));
  }
  else {
    message.reply("You don't have the right permissions to use this command.");
    return;
  }

  return;
}
