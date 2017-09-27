
import * as Discord from "discord.js";
import client from "./app";
import * as moment from "moment";
const schedule = require("./meeting-times.json");
const PRHour: any = moment(schedule.PR.startTime, ["h:mm A"]).format("HH");
const ArenaHour: any = moment(schedule.Arena.startTime, ["h:mm A"]).format("HH");
const VisHour: any = moment(schedule.Visualizer.startTime, ["h:mm A"]).format("HH");
const WebHour: any = moment(schedule.Web.startTime, ["h:mm A"]).format("HH");
const GameHour: any = moment(schedule.Game.startTime, ["h:mm A"]).format("HH");

let hasAnnounced: boolean = false;
let currentDay = moment(new Date()).format("dddd");
let currentHour: any = moment(new Date()).format("HH");

export default function check_if_its_time() {
  if((currentDay === schedule.PR.day) && ((PRHour-currentHour) === 1))
  {
    console.log("Public Relations meets in an hour! (" + schedule.PR.startTime + ") In " + schedule.PR.room);
    hasAnnounced = true;
  }
  if((currentDay === schedule.Visualizer.day) && ((VisHour-currentHour) === 1))
  {
    console.log("Visualizer meets today at " + schedule.Visualizer.startTime);
  }
  if((currentDay === schedule.Arena.day) && ((ArenaHour-currentHour) === 1))
  {
     console.log("Arena meets today at " + schedule.Arena.startTime);
  }
  if((currentDay === schedule.Game.day) && ((GameHour-currentHour) === 1))
  {
    console.log("Game/AI meets today at " + schedule.Game.startTime);
  }
  if((currentDay === schedule.Web.day) && ((WebHour-currentHour) === 1))
  {
    console.log("Web meets today at " + schedule.Web.startTime);
  }
  return hasAnnounced;
}

