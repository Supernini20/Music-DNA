
from ..calculate.calculate_music_features import evaluate_music_features
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
    # TODO evaluate personality answers
    #personality
    evaulation = evaluate_music_features(request.music, db)
    print(evaulation)
    
    #music_profile = Profile(personality=personality, music=evaulation)
    #music_profile_translation

    # TODO generate image and sound

    #print(request)
    #print(mysic_profile)

