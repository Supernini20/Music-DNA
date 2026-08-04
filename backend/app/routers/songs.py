from fastapi import APIRouter, Depends
from app.schemas.song import SongResponse
from app.services.song_service import search_songs, get_song_by_id

router = APIRouter()

@router.get("/search", response_model=list[SongResponse])
def search(query: str):
    return search_songs(query)

@router.get("/{song_id}", response_model=SongResponse)
def get_song(song_id: str):
    return get_song_by_id(song_id)