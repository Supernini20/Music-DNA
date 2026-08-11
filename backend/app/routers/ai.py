from fastapi import APIRouter
from pydantic import BaseModel

from services.image_generator import generate_image


router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class ImageRequest(BaseModel):
    prompt: str


@router.post("/generate")
def generate(request: ImageRequest):
    image = generate_image(request.prompt)

    image_path = "generated_images/generated.png"
    image.save(image_path)

    return {
        "message": "Image generated successfully",
        "path": image_path
    }