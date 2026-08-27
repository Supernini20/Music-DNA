// Requests to Backend
import { apiRequest } from "./client";

import type { Song, MusicProfileRequest, MusicProfile } from "../types";

export function searchSongs(query: string): Promise<Song[]> {
  return apiRequest<Song[]>(`/songs/search?q=${encodeURIComponent(query)}`);
}

export function getSong(id: string): Promise<Song> {
  return apiRequest<Song>(`/songs/${encodeURIComponent(id)}`);
}

export function createMusicProfile(
  data: MusicProfileRequest,
): Promise<MusicProfile> {
  return apiRequest<MusicProfile>("/music-profile/generate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
