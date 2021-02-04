import discord from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import { messageHandler } from "./utils/discord_handlers";
import { readStoredAnimeList } from "./utils/file_managers";
dotenv.config();

var animeList = readStoredAnimeList();
// console.log("ani list : " + JSON.stringify(animeList));

// Watch the animelist for changes
const watcher = fs.watch(`./${process.env.FILE_NAME}.json`);

watcher.on("change", (eventType) => {
  const newList = readStoredAnimeList();
  if (newList === animeList || eventType !== "change") return;
  animeList = newList;
});

// Initialize the discord client
const client = new discord.Client();

// Log in the client
client.login(process.env.TOKEN!);

// Listen to on ready event
client.on("ready", () => {
  console.log("Bot has been successfully initialized.");
});

// Listen to on message event
client.on("message", (message) => messageHandler(message));

// Check if the bot token exists
if (!process.env.TOKEN)
  throw new Error(
    "Bot token not found in the environment. Please verify your settings."
  );
