from pydantic import BaseModel
from typing import Optional, Dict, Any


class SongBase(BaseModel):
    external_id: str

    title: str
    artist: str
    album: Optional[str] = None

    duration_s: Optional[float] = None

    # Audio Features
    valence: Optional[float] = None
    arousal: Optional[float] = None
    authenticity: Optional[float] = None
    timeliness: Optional[float] = None
    complexity: Optional[float] = None
    bpm: Optional[float] = None
    voice: Optional[float] = None
    female: Optional[float] = None
    danceability: Optional[float] = None
    tonal: Optional[float] = None

    # Genre information
    genres: Optional[Dict[str, Any]] = None

    # IDs from source data
    track_id: Optional[str] = None
    artwork_id: Optional[str] = None


class SongCreate(SongBase):
    pass


class SongUpdate(BaseModel):
    title: Optional[str] = None
    artist: Optional[str] = None
    album: Optional[str] = None

    duration_s: Optional[float] = None

    # Audio Features
    valence: Optional[float] = None
    arousal: Optional[float] = None
    authenticity: Optional[float] = None
    timeliness: Optional[float] = None
    complexity: Optional[float] = None
    bpm: Optional[float] = None
    voice: Optional[float] = None
    female: Optional[float] = None
    danceability: Optional[float] = None
    tonal: Optional[float] = None

    # Genre information
    genres: Optional[Dict[str, Any]] = None

    # IDs from source data
    track_id: Optional[str] = None
    artwork_id: Optional[str] = None


class SongResponse(SongBase):
    id: int

    class Config:
        from_attributes = True