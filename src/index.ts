import discord from "discord.js";
import dotenv from "dotenv";
import { messageHandler } from "./utils/discord_handlers";

dotenv.config();

const client = new discord.Client();

client.on("ready", () => {
  console.log("Bot has been successfully initialized.");
});

client.on("message", (message) => messageHandler(message));

if (!process.env.TOKEN)
  throw new Error(
    "Bot token not found in the environment. Please verify your settings."
  );

client.login(process.env.TOKEN!);
