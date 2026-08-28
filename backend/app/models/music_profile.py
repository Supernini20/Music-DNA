from typing import Literal

from pydantic import BaseModel


Rating = Literal[1, 2, 3, 4, 5]
PersonalityDimension = Literal["E", "V", "G", "N", "O"]
Polung = Literal["+", "-"]


class PersonalityAnswer(BaseModel):
    dimension: PersonalityDimension
    polung: Polung
    answer: Rating


class Personality(BaseModel):
    answers: list[PersonalityAnswer]


class RatedSong(BaseModel):
    trackId: str
    rating: Rating


class Music(BaseModel):
    mostListened: str
    currentlyLiked: str
    identifiesWith: str
    bestDescribesMe: str
    ratedSongs: list[RatedSong]


class ProfileRequest(BaseModel):
    testId: str
    personality: Personality
    music: Music

from pydantic import BaseModel, Field, ConfigDict


class Genres(BaseModel):
    all_genres: dict[str, float]
    top3_genres: dict[str, float]


class Features(BaseModel):
    valence: float
    arousal: float
    authenticity: float
    timeliness: float
    complexity: float
    bpm: float
    voice: float
    female: float
    danceability: float
    tonal: float
    genres: Genres


class IDs(BaseModel):
    track_id: str
    artwork_id: str


class Track(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str = Field(alias="_id")
    title: str
    album: str
    artist: str
    duration_s: float
    features: Features
    ids: IDs