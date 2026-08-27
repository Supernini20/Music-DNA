from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/music-profile",
    tags=["Music Profile"]
)


class ProfileRequest(BaseModel):
    a: str # TODO


@router.post("/generate")
def generate(request: ProfileRequest):
    # TODO
    pass