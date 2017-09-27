
import * as Discord from "discord.js";
import client from "./app";
import * as moment from "moment";

const schedule = require("./meeting-times.json");
const PRHour: any = moment(schedule.PR.startTime, ["h:mm A"]).format("HH");
const ArenaHour: any = moment(schedule.Arena.startTime, ["h:mm A"]).format("HH");
const VisHour: any = moment(schedule.Visualizer.startTime, ["h:mm A"]).format("HH");
const WebHour: any = moment(schedule.Web.startTime, ["h:mm A"]).format("HH");
const GameHour: any = moment(schedule.Game.startTime, ["h:mm A"]).format("HH");
const GenHour: any = moment(schedule.General.startTime, ["h:mm A"]).format("HH");

const randomChannel: any = client.channels.get('275704765957275648');
const arenaChannel: any = client.channels.get('275717152168869899');
const webChannel: any = client.channels.get('275718920995078144');

export default function check_if_its_time() {
  let hasAnnounced: boolean = false;
  let currentDay = moment(new Date()).format("dddd");
  let currentHour: any = moment(new Date()).format("HH");

  if((currentDay === schedule.PR.day) && ((PRHour-currentHour) === 1))
  {
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

