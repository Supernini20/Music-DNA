// Frontend Types

export interface Song {
  id: string;
  title: string;
  album: string;
  artist: string;
  duration_s: number;

  features: SongFeatures;
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

export type MusicProfileRequest = {
  test: string;
};

export type GeneratedImage = {
  url: string;
};
export type GeneratedSound = {
  url: string;
};
