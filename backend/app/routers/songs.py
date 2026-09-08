from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas_song import SongCreate, SongResponse, SongSearchResponse, SongUpdate
from .. import crud


router = APIRouter(
    prefix="/songs",
    tags=["Songs"]
)


@router.post("/", response_model=SongResponse)
def create_song(
    song: SongCreate,
    db: Session = Depends(get_db)
):
    return crud.create_song(db, song)


@router.get("/", response_model=list[SongResponse])
def get_songs(
    db: Session = Depends(get_db)
):
    return crud.get_songs(db)


@router.get("/search", response_model=list[str])
def search_songs(
    name: str,
    db: Session = Depends(get_db)
):
    return crud.get_songs_by_name(db, name)


@router.get("/{song_id}", response_model=SongResponse)
def get_song(
    song_id: int,
    db: Session = Depends(get_db)
):
    song = crud.get_song(db, song_id)

    if not song:
        raise HTTPException(
            status_code=404,
            detail="Song not found"
        )

    return song


@router.get("/name/{song_name}", response_model=list[SongSearchResponse])
def get_song_by_name(
    song_name: str,
    db: Session = Depends(get_db)
):
    songs = crud.get_songs_by_name(db, song_name)

    if not songs:
        raise HTTPException(
            status_code=404,
            detail="No songs found"
        )

    return [
        {"id": id, "title": title, "artist": artist}
        for id, title, artist in songs
    ]
