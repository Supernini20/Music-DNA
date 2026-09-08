// Requests to Backend
import { apiRequest } from "./client";

import type { Track, MusicProfileRequest, MusicProfile } from "../types";

export function searchSongs(query: string): Promise<Track[]> {
  const result = apiRequest<Track[]>(
    `/songs/name/${encodeURIComponent(query)}`,
  );
  console.log(result);
  return result;
}

export function getSong(id: string): Promise<Track> {
  return apiRequest<Track>(`/songs/${encodeURIComponent(id)}`);
}

export function createMusicProfile(
  data: MusicProfileRequest,
): Promise<MusicProfile> {
  return apiRequest<MusicProfile>("/music-profile/generate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
