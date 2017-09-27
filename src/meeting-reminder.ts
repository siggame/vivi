
import * as Discord from "discord.js";
import * as moment from "moment";
import client from "./app";
// Store the meeting times data into object schedule
const schedule = require("./meeting-times.json");
// Format the current meetign startTime to a 24 style
// Current format is.... "3:00 PM" and will be formatted to.. "15"
const PRHour: any = moment(schedule.PR.startTime, ["h:mm A"]).format("HH");
const ArenaHour: any = moment(schedule.Arena.startTime, ["h:mm A"]).format("HH");
const VisHour: any = moment(schedule.Visualizer.startTime, ["h:mm A"]).format("HH");
const WebHour: any = moment(schedule.Web.startTime, ["h:mm A"]).format("HH");
const GameHour: any = moment(schedule.Game.startTime, ["h:mm A"]).format("HH");
const GenHour: any = moment(schedule.General.startTime, ["h:mm A"]).format("HH");

export default function check_if_its_time() {

  // Current channels that is viewable to me (Dylan) and will use these to 
  // have Vivi @ the correct roles in these channels (To no disturb everyone in announcement channel)
  const randomChannel: any = client.channels.get('275704765957275648');
  const arenaChannel: any = client.channels.get('275717152168869899');
  const webChannel: any = client.channels.get('275718920995078144');

  arenaChannel.send("TEST MY DUDE");

  let hasAnnounced: boolean = false;
  // Format of current day looks like... "Monday"
  let currentDay = moment(new Date()).format("dddd");
  // Format the current hour to a 24hour format.
  let currentHour: any = moment(new Date()).format("HH");

  // Each if statement is checking if "Monday" === "Monday"
  // And we're announcing the hour before the meeting, so 15-14 = 1? (3:00PM - 2:00PM)
  if((currentDay === schedule.PR.day) && ((PRHour-currentHour) === 1))
  {
    //Currently not outputting to the text channel till roles/permissions are sorted.
    console.log("Public Relations meets in an hour! ("
                + schedule.PR.startTime + ") In "
                + schedule.PR.room);
    hasAnnounced = true;
  }
  if((currentDay === schedule.Visualizer.day) && ((VisHour-currentHour) === 1))
  {
    console.log("Visualizer meets in an hour! ("
                + schedule.Visualizer.startTime + ") In "
                + schedule.Visualizer.room);
    hasAnnounced = true;
  }
  if((currentDay === schedule.Arena.day) && ((ArenaHour-currentHour) === 1))
  {
     console.log("Arena meets in an hour! ("
                + schedule.Arena.startTime + ") In "
                + schedule.Arena.room);
    hasAnnounced = true;
  }
  if((currentDay === schedule.Game.day) && ((GameHour-currentHour) === 1))
  {
    console.log("Game/AI meets in an hour! ("
                + schedule.Game.startTime + ") In "
                + schedule.Game.room);
    hasAnnounced = true;
  }
  if((currentDay === schedule.Web.day) && ((WebHour-currentHour) === 1))
  {
    console.log("Web meets in an hour! ("
                + schedule.Web.startTime + ") In "
                + schedule.Web.room);
    hasAnnounced = true;
  }
  if((currentDay === schedule.General.day) && ((GenHour-currentHour) === 1))
  {
    console.log("General meets in an hour! ("
                + schedule.General.startTime + ") In "
                + schedule.General.room);
    hasAnnounced = true;
  }
  return hasAnnounced;
}

