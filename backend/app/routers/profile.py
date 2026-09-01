import json
from statistics import mean, stdev

from ..models.music_profile import Features, Music, ProfileRequest, Track
from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/music-profile",
    tags=["Music Profile"]
)



@router.post("/generate")
def generate(request: ProfileRequest):
    # TODO create Music profile
    # TODO evaluate personality answers
    evaulation = evaluate_music_features(request.music)
    print(request)
    print(evaulation)
    pass


def evaluate_music_features(music: Music):
    song_features = load_song_features(music)
    result = {
        "valence": evalute_feature([f.valence for f in song_features]),
        "arousal": evalute_feature([f.arousal for f in song_features])
    }
    return result

def evalute_feature(features):
    #TODO: add all the stats
    return {
        "mean": mean(features),
        "std": stdev(features)
    }

def load_song_features(music: Music) -> list[Features]:
    #TODO Load tracks from DB
    track_paths = ["../data_files/6421a70f672791ee89603fbd.json", 
                   "../data_files/6421a769672791ee89603fbe.json", 
                   "../data_files/6421a816672791ee89603fc0.json"]
    tracks = []
    for track in track_paths:
        with open(track, "r") as f:
            data = f.read()
            tracks.append(Track.model_validate_json(data))

    return [t.features for t in tracks]