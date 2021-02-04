export interface Media {
  id: string;
  title: {
    english: string;
    romaji: string;
    native: string;
  };
  coverImage: {
    medium: string;
  };
  description: string;
  nextAiringEpisode?: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
  alert?: any;
}
