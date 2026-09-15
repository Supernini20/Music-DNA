from fastapi import APIRouter
from pydantic import BaseModel

from services.image_generator import generate_image


router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class ImageRequest(BaseModel):
    prompt: str

class AudioRequest(BaseModel):
    prompt: str


@router.post("/generate-image")
def generate(request: ImageRequest):
    image = generate_image(request.prompt)

    image_path = "generated/generated.png"
    image.save(image_path)

    return {
        "message": "Image generated successfully",
        "path": image_path
    }


@router.post("/generate-audio")
def generate_audio(request: AudioRequest):
    audio = generate_audio(request.prompt)

    audio_path = "generated/generated.mp3"
    audio.save(audio_path)

    return {
        "message": "Audio generated successfully",
        "path": audio_path
    }