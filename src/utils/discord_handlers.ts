import discord from "discord.js";
import { getData } from "./data";
import { createAlert } from "./discord_handlers.utils";
// import { writeToAnimeList } from "./file_managers";

export const messageHandler = async (
  message: discord.Message
): Promise<void> => {
  const arg_list = message.content.split(" ");
  if (arg_list[0] !== process.env.PREFIX) return;

  // Create anime channel to get updates
  let animeChannel: any = message.guild!.channels.cache.find(
    (channel) => channel.isText && channel.name === "anime-updates"
  );

  if (animeChannel === undefined)
    animeChannel = await message.guild?.channels.create("anime-updates", {
      type: "text",
    });

  // Commands
  switch (arg_list[1]) {
    case "add":
      const data = await getData(parseInt(arg_list[2]));
      const embed = new discord.MessageEmbed()
        .setTitle(data.title.english)
        .setThumbnail(data.coverImage.medium)
        .setDescription(
          data.description
            .replace(/(<i>)|(<\/i>)/g, "*")
            .replace(/(<br>)/g, "")
            .replace(/(<b>)|(<\/b>)/g, "**")
        )
        .addFields(
          { name: "Romaji", value: data.title.romaji, inline: true },
          { name: "Native", value: data.title.native, inline: true },
          { name: "ID", value: data.id, inline: true }
        )
        .addFields(
          {
            name: "Next Epsiode",
            value: data.nextAiringEpisode!.episode,
            inline: true,
          },
          {
            name: "Next Epsiode On",
            value: new Date(
              data.nextAiringEpisode!.airingAt * 1000
            ).toDateString(),
            inline: true,
          },
          {
            name: "Next Epsiode In",
            value: `${(
              data.nextAiringEpisode!.timeUntilAiring /
              60 /
              60 /
              24
            ).toPrecision(1)} days`,
            inline: true,
          }
        );
      message.channel.send(embed);
      break;

    // Subscribe to updates using a role
    case "subscribe":
      let role: discord.Role | undefined = message.guild?.roles.cache.find(
        (role) => role.name === "anime"
      );
      console.log(role);
      role = !role
        ? await message.guild?.roles.create({
            data: {
              name: "anime",
              color: arg_list[2] ? arg_list[2] : "RED",
            },
          })
        : role;

      if (
        message.guild
          ?.member(message.author)
          ?.roles.cache.find((role) => role.name === "anime")
      ) {
        message.reply(
          "You are already subscribed to updates. Use XXX to unsubscribe."
        );
        return;
      } else {
        message.guild?.member(message.author)?.roles.add(role!);
        message.reply(
          "You have been subscribed to anime updates! Check your roles."
        );
      }
    default:
      return;
  }
};
