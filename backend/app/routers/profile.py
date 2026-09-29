from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pathlib import Path

from services.music_generator import save_audio, generate_music
from services.image_generator import generate_image

from ..calculate.calculate_music_features import evaluate_music_features
from ..translate.translate_music_features import music_profile_to_sound_prompt
from ..translate.translate_music_features_to_visuals import music_profile_to_image_prompt
from ..translate.translate_visuals import big5_to_prompt

from ..database import get_db
from ..calculate.calculate_profiles import calculate_big_five
from ..models.music_profile import ProfileRequest


router = APIRouter(
    prefix="/music-profile",
    tags=["Music Profile"],
)

profiles: dict[str, dict] = {}
GENERATED_DIR = Path(__file__).resolve().parents[2] / "generated"


@router.post("/generate")
def generate(
    request: ProfileRequest,
    db: Session = Depends(get_db)
  ):
    _, personality_values = calculate_big_five(request.model_dump())
    profile = {
        "testId": request.testId,
        "personality": personality_values,
        "request": request.model_dump(),
        "imageUrl": f"/generated/{request.testId}.png",
        "audioUrl": f"/generated/{request.testId}.wav",
    }
    profiles[request.testId] = profile
    evaulation = evaluate_music_features(request.music, db)
    sound_prompt = music_profile_to_sound_prompt(evaulation)
    image_prompt = music_profile_to_image_prompt(evaulation) + big5_to_prompt(personality_values)
    
    print(sound_prompt)
    print(image_prompt)
    
    #image = generate_image(image_prompt)
    #image_path = GENERATED_DIR / f"{request.testId}.png"
    #image.save(image_path)

    #audio_array, sampling_rate = generate_music(sound_prompt)
    #audio_path = GENERATED_DIR / f"{request.testId}.wav"
    #save_audio(audio_array, sampling_rate, str(audio_path))

    return profile


@router.get("/{test_id}")
def get_profile(test_id: str):
    profile = profiles.get(test_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
