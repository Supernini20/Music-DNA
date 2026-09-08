// Frontend Types

export interface Song {
  id: string;
  title: string;
  album?: string;
  artist: string;
  duration_s?: number;

  features?: SongFeatures;
}

export interface SongFeatures {
  valence: number;
  arousal: number;
  authenticity: number;
  timeliness: number;
  complexity: number;
  danceable: number;
  tonal: number;
  voice: number;
  genre: string;
}

// Request Types

export type MusicProfile = {
  test: string;
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

interface Music {
  mostListened: string;
  currentlyLiked: string;
  identifiesWith: string;
  bestDescribesMe: string;
  ratedSongs: RatedSong[];
}

export interface MusicProfileRequest {
  testId: string;
  personality: Personality;
  music: Music;
}

export type GeneratedImage = {
  url: string;
};
export type GeneratedSound = {
  url: string;
};
