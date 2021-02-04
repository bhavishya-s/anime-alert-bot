import axios from "axios";
import { Media } from "../interfaces";

export const getData = async (id: number): Promise<Media> => {
  const response = await axios.post("https://graphql.anilist.co/", {
    query: `
    {
      Media(id: ${id}, type:ANIME, status:RELEASING){
        id
        title{
          english
          romaji
          native
        }
        coverImage{
          medium
        }
        description
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    
}
    `,
  });
  return response.data.data.Media;
};
