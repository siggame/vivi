import * as Discord from "discord.js";
const config = require("../config.json");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("IM READYYYYYYYYY");
});

client.on("message", (message: Discord.Message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

client.login(config.token).catch((e) => console.log(e));
