import * as Discord from "discord.js";
import * as ytdl from "ytdl-core";

const url: string = "https://www.youtube.com/watch?v=TRqiFPpw2fY";

export default function music(message: Discord.Message) {

  const voicechannel = message.member.voiceChannel;

  if (!voicechannel) {
    return message.reply("How can I play music in a text channel?");
  }
  if(message.channel.type == "dm") {
    return message.reply("you're silly, I can't play music when we're talking privately.");
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
