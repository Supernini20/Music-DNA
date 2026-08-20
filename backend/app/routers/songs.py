from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas_song import SongCreate, SongResponse, SongUpdate
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

@router.get("/name/{song_name}", response_model=SongResponse)
def get_song_by_name(
    song_name: str,
    db: Session = Depends(get_db)
):
    song = crud.get_song_by_name(db, song_name)

    if not song:
        raise HTTPException(
            status_code=404,
            detail="Song not found"
        )

    return song



"""
@router.put("/{song_id}", response_model=SongResponse)
def update_song(
    song_id: int,
    song: SongUpdate,
    db: Session = Depends(get_db)
):
    updated_song = crud.update_song(
        db,
        song_id,
        song
    )

    if not updated_song:
        raise HTTPException(
            status_code=404,
            detail="Song not found"
        )

    return updated_song


@router.delete("/{song_id}")
def delete_song(
    song_id: int,
    db: Session = Depends(get_db)
):
    deleted_song = crud.delete_song(db, song_id)

    if not deleted_song:
        raise HTTPException(
            status_code=404,
            detail="Song not found"
        )

    return {
        "message": "Song deleted successfully"
    }
"""