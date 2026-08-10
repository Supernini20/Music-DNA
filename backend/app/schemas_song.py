from pydantic import BaseModel
from typing import Optional


class SongBase(BaseModel):
    title: str
    artist: str
    album: Optional[str] = None
    genre: Optional[str] = None
    release_year: Optional[int] = None


class SongCreate(SongBase):
    pass


class SongUpdate(BaseModel):
    title: Optional[str] = None
    artist: Optional[str] = None
    album: Optional[str] = None
    genre: Optional[str] = None
    release_year: Optional[int] = None


class SongResponse(SongBase):
    id: int

    class Config:
        from_attributes = True