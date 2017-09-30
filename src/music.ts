import * as Discord from "discord.js";
import * as ytdl from "ytdl-core";

const url: string = "https://www.youtube.com/watch?v=TRqiFPpw2fY";

export default function music(message: Discord.Message) {

  if(message.channel.type == "dm") {
    return message.channel.send("You're silly, I can't play music when we're talking privately.");
  }

  const voicechannel = message.member.voiceChannel;

  if (!voicechannel) {
    return message.reply("How can I play music in a text channel?");
  }
  voicechannel.join()
    .then(connection => {
      const stream = ytdl(url, {
        filter: "audioonly",
      });
      const dispatcher = connection.playStream(stream);
      dispatcher.on("end", () => {
        voicechannel.leave();
      });
    }).catch((e) => console.log(e));
}
