from pathlib import Path
import json

from ..translate.translate_music_features_to_visuals import music_profile_to_image_prompt
from ..translate.translate_music_features import music_profile_to_sound_prompt
from ..calculate.calculate_music_features import evaluate_music_features
from ..calculate.calculate_profiles import calculate_big_five
from ..models.music_profile import MusicProfile, PersonalityProfile, Profile, ProfileRequest
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
    #fake daten holen
    file_path = Path(__file__).resolve().parents[3] / "frontend" / "src" / "data" / "testData.json"

    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    #personality berechnen
    answers_per_category , personality_values = calculate_big_five(data)

    return personality_values

    """
    # TODO evaluate personality answers
    #personality
    evaulation = evaluate_music_features(request.music, db)
    translation = music_profile_to_sound_prompt(evaulation)
    translation = music_profile_to_image_prompt(evaulation)
    print(translation)
    #music_profile = Profile(personality=personality, music=evaulation)
    #music_profile_translation

    # TODO generate image and sound

    #print(request)
    #print(mysic_profile)
    """
