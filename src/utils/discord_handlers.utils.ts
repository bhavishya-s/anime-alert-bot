import discord from "discord.js";
import { Media } from "../interfaces";
import { writeToAnimeList } from "./file_managers";

export const createAlert = (anime: Media, message?: discord.Message): Media => {
  writeToAnimeList(anime);
  anime.alert = setTimeout(() => {
    console.log(`New episode for ${anime.title.english} is now out!`);
  }, anime.nextAiringEpisode?.timeUntilAiring);
  return anime;
};
