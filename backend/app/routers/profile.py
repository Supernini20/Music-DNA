from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

from services.music_generator import save_audio, generate_music
from services.image_generator import generate_image

from ..calculate.calculate_music_features import evaluate_music_features
from ..translate.translate_music_features import music_profile_to_sound_prompt
from ..translate.translate_music_features_to_visuals import music_profile_to_image_prompt
from ..translate.translate_visuals import big5_to_prompt
from ..translate.translate_visual_identity import build_image_prompt, build_visual_identity

from ..database import get_db
from ..calculate.calculate_profiles import calculate_big_five
from ..models.music_profile import ProfileRequest


router = APIRouter(
    prefix="/music-profile",
    tags=["Music Profile"],
)

profiles: dict[str, dict] = {"test-id": {}}
GENERATED_DIR = Path(__file__).resolve().parents[2] / "generated"
generation_pool = ThreadPoolExecutor(max_workers=2)


def generate_profile_image(test_id: str, prompt: str):
    try:
        image = generate_image(prompt)
        image.save(GENERATED_DIR / f"{test_id}.png")
        profiles[test_id]["imageUrl"] = f"/generated/{test_id}.png"
        profiles[test_id]["imageStatus"] = "ready"
    except Exception as error:
        profiles[test_id]["imageStatus"] = "failed"
        print(f"Image generation failed for {test_id}: {error}")


def generate_profile_audio(test_id: str, prompt: str):
    try:
        audio_array, sampling_rate = generate_music(prompt)
        save_audio(
            audio_array,
            sampling_rate,
            str(GENERATED_DIR / f"{test_id}.wav"),
        )
        profiles[test_id]["audioUrl"] = f"/generated/{test_id}.wav"
        profiles[test_id]["audioStatus"] = "ready"
    except Exception as error:
        profiles[test_id]["audioStatus"] = "failed"
        print(f"Audio generation failed for {test_id}: {error}")


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
        "imageUrl": None,
        "audioUrl": None,
        "imageStatus": "pending",
        "audioStatus": "pending",
    }
    profiles[request.testId] = profile
    evaulation = evaluate_music_features(request.music, db)
    sound_prompt = music_profile_to_sound_prompt(evaulation)
    music_visuals = music_profile_to_image_prompt(evaulation)
    personality_visuals = big5_to_prompt(personality_values)
    visual_identity = build_visual_identity(
        music_visuals,
        personality_visuals,
    )
    image_prompt = build_image_prompt(visual_identity)
    print(image_prompt)
    
    #generation_pool.submit(generate_profile_image, request.testId, image_prompt)
    #generation_pool.submit(generate_profile_audio, request.testId, sound_prompt)

    return profile


@router.get("/{test_id}")
def get_profile(test_id: str):
    profile = profiles.get(test_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
