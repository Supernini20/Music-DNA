# Music-DNA Backend

Backend der Music-DNA-Webanwendung. Das System erfasst musikalische
Merkmale einer Person, erstellt daraus ein **Music Profile** und nutzt
dieses Profil als Grundlage für KI-generierte Musik und Bilder.

## Architektur

``` text
Songdaten
   │
   ▼
Analyse / Profilberechnung
   │
   ▼
Music Profile
   │
   ├──► Übersetzung musikalischer Features
   │        └──► KI-Musik
   │
   └──► Übersetzung zu visuellen Features
            └──► KI-Bild
```

## Komponenten

### `calculate`

Berechnet aus der fronted Umfrage die "Big Five Persönlichkeitsmerkmale" und musikalische Features. Dies verwenden wir als repräsentation der musikalischen Persönlichkeit.

### `models`

Enthält die Datenmodelle für musikalische Profile.

### `routers`

Stellt die Backend-API bereit:

-   `songs.py` -- Songdaten
-   `profile.py` -- Music Profiles
-   `ai.py` -- KI-bezogene Funktionen

### `translate`

Übersetzt musikalische Features in semantische bzw. visuelle
Beschreibungen, die anschließend für die Generierung verwendet werden.

### `services`

Kapselt die externen bzw. generativen Prozesse. Die Bereitstellung der verwendeten Modelle erfolgt über **Hugging Face**.

- `image_generator.py` – Generierung von Bildern
  - Modell: `black-forest-labs/FLUX.1-schnell`
  - Parameters: **12B**
  - Schnelles und qualitativ gutes Modell für die Bildgenerierung

- `music_generator.py` – Generierung von Musik
  - Modell: `facebook/musicgen-small`
  - Parameters: **0,6B**
  - Deutlich schwieriger zu finden bzw. bereitzustellen als Modelle für die Bildgenerierung


### `datenbank`

Die Datenbank bildet die zentrale Persistenzschicht des Backends. Der
Zugriff erfolgt über **SQLAlchemy**.

Die wichtigsten Dateien sind:

``` text
database.py      → Datenbankverbindung und Session
models_song.py   → SQLAlchemy-Modell für Songs
schemas_song.py  → Daten-/API-Schemas
crud.py          → Datenbankzugriffe
import_songs.py  → Import der vorhandenen JSON-Daten aus seperatem Ordner
```

## Setup

Virtuelle Umgebung erstellen:

``` bash
python -m venv .venv
```

Aktivieren:

``` bash
# Linux / macOS
source .venv/bin/activate

# Windows
.venv\Scripts\activate
```

Abhängigkeiten installieren:

``` bash
pip install -r requirements.txt
```

API-Schlüssel und weitere Konfiguration werden über `.env`
bereitgestellt. Die Datei darf nicht in das Repository committed werden.

## Start

Der API-Einstiegspunkt ist `app/main.py`.

Bei Verwendung von Uvicorn:

``` bash
uvicorn app.main:app --reload
```