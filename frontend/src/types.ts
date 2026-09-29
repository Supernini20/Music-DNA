export type MusicProfile = {
  testId: string;
  personality: Record<string, number>;
  request?: MusicProfileRequest;
  imageUrl?: string;
  audioUrl?: string;
  imageStatus?: "pending" | "ready" | "failed";
  audioStatus?: "pending" | "ready" | "failed";
};

type Rating = 1 | 2 | 3 | 4 | 5;

type PersonalityDimension = "E" | "V" | "G" | "N" | "O";
type Polung = "+" | "-";

interface PersonalityAnswer {
  dimension: PersonalityDimension;
  polung: Polung;
  answer: Rating;
}

interface Personality {
  answers: PersonalityAnswer[];
}

interface RatedSong {
  trackId: string;
  rating: Rating;
}

export interface Music {
  favoriteSongs: string[];
  identifiesWith: string;
  ratedSongs: RatedSong[];
}
export interface MusicProfileRequest {
  testId: string;
  personality: Personality;
  music: Music;
}
export interface Genres {
  all_genres: Record<string, number>;
  top3_genres: Record<string, number>;
}
export interface Features {
  valence: number;
  arousal: number;
  authenticity: number;
  timeliness: number;
  complexity: number;
  bpm: number;
  voice: number;
  female: number;
  danceability: number;
  tonal: number;
  genres: Genres;
}
export interface TrackIds {
  track_id: string;
  artwork_id: string;
}
export interface Track {
  id: string;
  title: string;
  album?: string;
  artist: string;
  duration_s?: number;
  features?: Features;
  ids?: TrackIds;
}

export type GeneratedImage = {
  url: string;
};
export type GeneratedSound = {
  url: string;
};
