import json
from pathlib import Path

from sqlalchemy.orm import Session

from .database import SessionLocal
from .models_song import Song


DATA_DIR = Path("data_files")
print("Existiert:", DATA_DIR.exists())

def import_songs():

    db: Session = SessionLocal()

    try:
        for file in DATA_DIR.glob("*.json"):
            print("start")
            print(f"Importiere: {file.name}")

            with open(file, "r", encoding="utf-8") as f:
                data = json.load(f)

            features = data.get("features", {})
            ids = data.get("ids", {})

            # Prüfen, ob Song bereits existiert
            existing_song = (
                db.query(Song)
                .filter(Song.external_id == data["_id"])
                .first()
            )

            if existing_song:
                print(f"  Überspringe: {data['title']} (bereits vorhanden)")
                continue

            song = Song(
                external_id=data["_id"],
                title=data["title"],
                artist=data["artist"],
                album=data.get("album"),
                duration_s=data.get("duration_s"),

                valence=features.get("valence"),
                arousal=features.get("arousal"),
                authenticity=features.get("authenticity"),
                timeliness=features.get("timeliness"),
                complexity=features.get("complexity"),
                bpm=features.get("bpm"),
                voice=features.get("voice"),
                female=features.get("female"),
                danceability=features.get("danceability"),
                tonal=features.get("tonal"),

                genres=features.get("genres"),

                track_id=ids.get("track_id"),
                artwork_id=ids.get("artwork_id"),
            )

            db.add(song)
            print(f"  ✓ {data['title']}")

        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    import_songs()