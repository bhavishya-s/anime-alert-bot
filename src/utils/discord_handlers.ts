import discord from "discord.js";
import { getData } from "./data";
import { writeToAnimeList } from "./file_managers";

export const messageHandler = (message: discord.Message): void => {
  const arg_list = message.content.split(" ");
  if (arg_list[0] !== process.env.PREFIX) return;

  switch (arg_list[1]) {
    case "add":
      getData(parseInt(arg_list[2]))
        .then((res) => writeToAnimeList(res))
        .catch((err) => console.log("Couldnt resolve the query."));
      break;
    default:
      message.reply("Error occured.");
      return;
  }
};
