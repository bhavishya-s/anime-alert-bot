import { Media } from "../interfaces";
import fs from "fs";

export const readStoredAnimeList = (): Media => {
  if (!fs.existsSync(`./${process.env.FILE_NAME}.json`))
    fs.writeFileSync(`./${process.env.FILE_NAME}.json`, "{}", "utf8");

  const file = fs.readFileSync(`./${process.env.FILE_NAME}.json`, "utf8");
  const data = JSON.parse(file);
  return data;
};

export const writeToAnimeList = (anime: Media): boolean | Media => {
  if (!fs.existsSync(`./${process.env.FILE_NAME}.json`))
    fs.writeFileSync(`./${process.env.FILE_NAME}.json`, "{}", "utf8");

  const file = fs.readFileSync(`./${process.env.FILE_NAME}.json`, "utf8");
  const data = JSON.parse(file);
  data[anime.id] = anime;
  try {
    fs.writeFileSync(
      `./${process.env.FILE_NAME}.json`,
      JSON.stringify(data),
      "utf8"
    );
  } catch (err) {
    console.log(
      "An error occured while trying to write to the anime list file."
    );
  }
  return true;
};
