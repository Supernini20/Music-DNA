from sqlalchemy.orm import Session

from .models_song import Song
from .schemas_song import SongCreate, SongUpdate


def create_song(db: Session, song: SongCreate):
    db_song = Song(
        title=song.title,
        artist=song.artist,
        album=song.album,
        genre=song.genre,
        release_year=song.release_year
    )

    db.add(db_song)
    db.commit()
    db.refresh(db_song)

    return db_song


def get_songs(db: Session):
    return db.query(Song).all()


def get_song(db: Session, song_id: int):
    return db.query(Song).filter(Song.id == song_id).first()


def update_song(db: Session, song_id: int, song: SongUpdate):
    db_song = get_song(db, song_id)

    if not db_song:
        return None

    update_data = song.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_song, key, value)

    db.commit()
    db.refresh(db_song)

    return db_song


def delete_song(db: Session, song_id: int):
    db_song = get_song(db, song_id)

    if not db_song:
        return None

    db.delete(db_song)
    db.commit()

    return db_song