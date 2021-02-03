export interface Media {
  id: string;
  title: {
    language: string;
  };
  nextAiringEpisode?: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
}
