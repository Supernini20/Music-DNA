from sqlalchemy import Column, Integer, String, Float, JSON
from .database import Base


class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)

    # Grundinformationen
    external_id = Column(String, unique=True, nullable=False, index=True)
    title = Column(String, nullable=False)
    artist = Column(String, nullable=False)
    album = Column(String, nullable=True)

    duration_s = Column(Float, nullable=True)

    # Audio Features
    valence = Column(Float, nullable=True)
    arousal = Column(Float, nullable=True)
    authenticity = Column(Float, nullable=True)
    timeliness = Column(Float, nullable=True)
    complexity = Column(Float, nullable=True)
    bpm = Column(Float, nullable=True)
    voice = Column(Float, nullable=True)
    female = Column(Float, nullable=True)
    danceability = Column(Float, nullable=True)
    tonal = Column(Float, nullable=True)

    genres = Column(JSON, nullable=True)

    # IDs aus den Quelldaten
    track_id = Column(String, nullable=True)
    artwork_id = Column(String, nullable=True)