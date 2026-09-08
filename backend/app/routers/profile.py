import json
from statistics import mean, stdev

from app import crud

from ..models.music_profile import Features, Genres, Music, ProfileRequest, Track
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db


router = APIRouter(
    prefix="/music-profile",
    tags=["Music Profile"]
)



@router.post("/generate")
def generate(request: ProfileRequest, db: Session = Depends(get_db)
):
    # TODO evaluate personality answers
    evaulation = evaluate_music_features(request.music, db)
    # TODO create Music profile
    # TODO generate image and sound
    print(request)
    print(evaulation)


def evaluate_music_features(music: Music, db:Session):
    ''' Get songs and evaluate their features '''
    tracks = load_tracks(music, db)
    favorite_ids = set(music.favoriteSongs)
    print("hhhherhjerhererrrrer: ", favorite_ids)
    favorite_features = [
        track.genres
        for track in tracks
        if str(track.id) in favorite_ids
    ]

    result = {
        "identifiesWith": music.identifiesWith,
        "valence": evalute_feature([f.valence for f in tracks]),
        "arousal": evalute_feature([f.arousal for f in tracks]),
        "bpm": evalute_feature([f.bpm for f in tracks]),
        "voice": evalute_feature([f.voice for f in tracks]),
        "female": evalute_feature([f.female for f in tracks]),
        "danceability": evalute_feature([f.danceability for f in tracks]),
        "genres": top_generes(favorite_features)
    }
    return result

def top_generes(song_features: list[dict]) -> Genres:
    genre_counts = {}

    for features in song_features:
        # top3_genres ist hier vermutlich ein dict[str, float]
        genres = features["top3_genres"]

        for genre in genres:
            genre_counts[genre] = genre_counts.get(genre, 0) + 1

    number_of_songs = len(song_features)

    genre_percentages = {
        genre: count / number_of_songs
        for genre, count in genre_counts.items()
    }

    sorted_genres = sorted(
        genre_percentages.items(),
        key=lambda item: item[1],
        reverse=True
    )

    return Genres(
        all_genres=dict(sorted_genres),
        top3_genres=dict(sorted_genres[:3])
    )

def evalute_feature(features: list[float]):
    return {
        "mean": mean(features),
        "std": stdev(features)
    }

def load_tracks(music: Music, db: Session) -> list[Track]:
    """Load all tracks needed for the music profile."""

    track_ids = (
        music.favoriteSongs
        + [song.trackId for song in music.ratedSongs]
    )

    tracks = crud.get_songs_by_id(db, track_ids)
    return tracks
