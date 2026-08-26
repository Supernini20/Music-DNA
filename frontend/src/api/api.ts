// Requests to Backend
import { apiRequest } from "./client";

import type {
  Song,
  MusicProfileRequest,
  MusicProfile,
  GeneratedImage,
  GeneratedSound,
} from "../types";

export function searchSongs(query: string): Promise<Song[]> {
  return apiRequest<Song[]>(`/songs/search?q=${encodeURIComponent(query)}`);
}

export function getSong(id: string): Promise<Song> {
  return apiRequest<Song>(`/songs/${encodeURIComponent(id)}`);
}

export function createMusicProfile(
  data: MusicProfileRequest,
): Promise<MusicProfile> {
  return apiRequest<MusicProfile>("/music-profile", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function generateImage(profile: MusicProfile): Promise<GeneratedImage> {
  return apiRequest<GeneratedImage>("/generate/image", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

export function generateSound(profile: MusicProfile): Promise<GeneratedSound> {
  return apiRequest<GeneratedSound>("/generate/sound", {
    method: "POST",
    body: JSON.stringify(profile),
  });
}
