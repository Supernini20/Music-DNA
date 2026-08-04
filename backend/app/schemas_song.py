from pydantic import BaseModel


class SongCreate(BaseModel):
    title: str
    artist: str
    album: str | None = None
    genre: str | None = None
    year: int | None = None


class Song(SongCreate):
    id: int

    model_config = {
        "from_attributes": True
    }