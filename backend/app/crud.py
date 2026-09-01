from sqlalchemy.orm import Session

from .models_song import Song
from .schemas_song import SongCreate, SongUpdate

def create_song(db: Session, song: SongCreate):
    db_song = Song(
        external_id=song.external_id,
        title=song.title,
        artist=song.artist,
        album=song.album,

        duration_s=song.duration_s,

        # Audio Features
        valence=song.valence,
        arousal=song.arousal,
        authenticity=song.authenticity,
        timeliness=song.timeliness,
        complexity=song.complexity,
        bpm=song.bpm,
        voice=song.voice,
        female=song.female,
        danceability=song.danceability,
        tonal=song.tonal,

        # Genres
        genres=song.genres,

        # Source IDs
        track_id=song.track_id,
        artwork_id=song.artwork_id,
    )

    db.add(db_song)
    db.commit()
    db.refresh(db_song)

    return db_song


def get_songs(db: Session):
    return db.query(Song).all()


def get_song(db: Session, song_id: int):
    return db.query(Song).filter(Song.id == song_id).first()

def get_song_by_name(db: Session, song_name: str):
    return db.query(Song).filter(Song.title == song_name).first()

def get_songs_by_name(db: Session, song_name: str):
    return [
        title
        for (title,) in (
            db.query(Song.title)
            .filter(Song.title.ilike(f"%{song_name}%"))
            .limit(10)
            .all()
        )
    ]

"""
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
"""