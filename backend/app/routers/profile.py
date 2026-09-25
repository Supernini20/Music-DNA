from fastapi import APIRouter, HTTPException

from ..calculate.calculate_profiles import calculate_big_five
from ..models.music_profile import ProfileRequest


router = APIRouter(
    prefix="/music-profile",
    tags=["Music Profile"],
)

profiles: dict[str, dict] = {}


@router.post("/generate")
def generate(request: ProfileRequest):
    _, personality_values = calculate_big_five(request.model_dump())
    profile = {
        "testId": request.testId,
        "personality": personality_values,
        "request": request.model_dump(),
    }
    profiles[request.testId] = profile
    return profile
    """
      evaulation = evaluate_music_features(request.music, db)
      translation = music_profile_to_sound_prompt(evaulation)
      translation = music_profile_to_image_prompt(evaulation)
      print(translation)
      #music_profile = Profile(personality=personality, music=evaulation)
      #music_profile_translation

      # TODO generate image and sound
      """


@router.get("/{test_id}")
def get_profile(test_id: str):
    profile = profiles.get(test_id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
