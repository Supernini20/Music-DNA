# Music-DNA

Music-DNA ist eine Webanwendung zur Erfassung und Analyse musikalischer
Vorlieben. Nutzer beantworten Fragen zu ihrer Persönlichkeit, wählen Songs
aus, die ihnen wichtig sind, und bewerten vorgegebene Hörbeispiele. Aus
diesen Angaben entsteht ein persönliches **Music Profile** mit musikalischen
Features und Big-Five-Persönlichkeitswerten.

Das Projekt verbindet dabei drei Perspektiven auf Musik:

- subjektive Vorlieben durch ausgewählte Lieblingssongs und Bewertungen,
- persönliche Identifikation durch einen selbst eingetragenen Songtitel,
- objektive Songdaten wie Genre, BPM und weitere Audio-Features.

Das Profil kann anschließend in semantische Prompts für eine visuelle und
akustische Darstellung übersetzt werden. Die dafür vorgesehenen
Hugging-Face-Modelle sind `black-forest-labs/FLUX.1-schnell` für Bilder und
`facebook/musicgen-small` für Musik.

## Architektur

Die Anwendung besteht aus einem React-/TypeScript-Frontend und einem
Python-/FastAPI-Backend. Das Frontend verwaltet Navigation, Formulare und
den lokalen Zustand des Tests. Das Backend stellt die API bereit, liest
Songdaten aus SQLite, berechnet das Music Profile und kapselt die
KI-Services.

```text
┌─────────────────────────────────────────────────────────────────┐
│                         React-Frontend                          │
│                                                                 │
│  HomePage  ──>  ProfileTest  ──>  ProfileResults                │
│                    │                    │                        │
│                    │ POST /music-      │ GET /music-profile/{id} │
│                    │ profile/generate  │                        │
│                    │                    │                        │
│          GET /songs/name/{query}       │                        │
│          GET /songs/                   │                        │
└──────────────────────────┬──────────────────────────────────────┘
									│ HTTP/JSON
┌──────────────────────────▼──────────────────────────────────────┐
│                         FastAPI-Backend                         │
│                                                                 │
│  Routers: songs.py | profile.py | ai.py                         │
│       │                │                                        │
│       ▼                ▼                                        │
│  SQLite / SQLAlchemy  Profilberechnung                          │
│                       │                                          │
│                       ├─ calculate: Big Five und Musikfeatures  │
│                       ├─ translate: Audio-/Bild-Prompts         │
│                       └─ services: Hugging Face, Audio, Dateien  │
└─────────────────────────────────────────────────────────────────┘
```

### Ablauf der Profilerstellung

```text
Songdaten aus SQLite + Antworten des Nutzers
							  │
							  ▼
		 Big-Five- und Musikprofil-Berechnung
							  │
							  ▼
					  Music Profile
							  │
			 ┌────────────┴────────────┐
			 ▼                         ▼
 Übersetzung in Audio-Prompt   Übersetzung in Bild-Prompt
			 │                         │
			 ▼                         ▼
	MusicGen / Audiodatei       FLUX / Bilddatei
```

Beim Start des Backends wird die SQLite-Datenbank angelegt und der
Songimport aus den JSON-Dateien ausgeführt. Die Profildaten werden aktuell
im Speicher des laufenden FastAPI-Prozesses gehalten. Dadurch sind Profile
nach einem Backend-Neustart nicht dauerhaft verfügbar.

## Projektstruktur

```text
Music-DNA/
├── frontend/
│   ├── src/
│   │   ├── api/              HTTP-Client und typisierte API-Funktionen
│   │   ├── components/       Wiederverwendbare Test- und Profil-UI
│   │   ├── data/             Fragen für den Persönlichkeitstest
│   │   ├── pages/             Home, Test und Ergebnisse
│   │   ├── App.tsx            React-Routing
│   │   └── types.ts           Frontend-Datenmodelle
│   └── public/               Statische Assets, unter anderem Audio-Previews
├── backend/
│   ├── app/
│   │   ├── main.py            FastAPI-App, CORS und Startup
│   │   ├── routers/           Songs, Music Profiles und direkte KI-Endpunkte
│   │   ├── calculate/         Berechnung von Profilen und Musikfeatures
│   │   ├── models/            Pydantic-Modelle für Music Profiles
│   │   ├── translate/         Features zu semantischen Prompts
│   │   ├── database.py        SQLAlchemy-Engine und Datenbank-Sessions
│   │   ├── models_song.py     SQLAlchemy-Songmodell
│   │   ├── schemas_song.py    API-Schemas für Songs
│   │   ├── crud.py            Datenbankzugriffe
│   │   └── import_songs.py    Import der JSON-Songdaten
│   ├── services/              Bild- und Musikgenerierung
│   ├── data_files_small/      Kleine Beispieldatenbasis
│   ├── generated/             Ausgabeverzeichnis für generierte Dateien
│   └── requirements.txt       Python-Abhängigkeiten
└── research/                  Fachliche Grundlagen und Recherche
```

## Frontend

Das Frontend verwendet React, TypeScript, Vite und React Router. Die API-
Basis-URL wird über `VITE_API_URL` gesetzt; wenn die Variable fehlt, wird
`http://localhost:8000` verwendet.

### `/` - HomePage

Die Startseite erklärt die Idee des Projekts und bietet den Einstieg in den
Test. Der Button navigiert ohne Backend-Request zu `/test`.

### `/test` - ProfileTest

Diese Seite führt durch alle Eingaben für ein neues Music Profile:

1. **Persönlichkeitsfragen:** Die Fragen aus `src/data/questions.json`
   werden einzeln angezeigt. Jede Antwort wird lokal gespeichert und am
   Ende als Liste mit Dimension, Polung und Wert übertragen.
2. **Lieblingssongs:** Über eine Autocomplete-Suche werden drei Songs aus
   dem Backend ausgewählt. Die Suche verwendet
   `GET /songs/name/{song_name}`.
3. **Identifikationssong:** Ein frei eingegebener Songtitel wird als
   `identifiesWith` Teil des Profils.
4. **Songbewertungen:** Sieben vorgegebene Songs werden über
   `GET /songs/` geladen. Die Songs werden im Frontend mit Audio-Previews
   aus `public/` verbunden und jeweils mit 1 bis 5 Sternen bewertet.

Der Abschlussbutton ist erst aktiv, wenn alle Persönlichkeitsfragen
beantwortet, genau drei Lieblingssongs ausgewählt, der Identifikationssong
ausgefüllt und sieben Bewertungen abgegeben wurden. Danach erzeugt das
Frontend eine UUID als `testId` und sendet die gesammelten Daten mit
`POST /music-profile/generate` an das Backend. Bei Erfolg erfolgt die
Navigation zu `/profile/{testId}`.

### `/profile/:testId` - ProfileResults

Die Ergebnisseite lädt das erstellte Profil mit
`GET /music-profile/{testId}`. Sie zeigt den Profil-Header sowie die
Statusinformationen und URLs für generierte Audio- und Bilddateien.

Solange Medien den Status `pending` haben, fragt die Seite das Profil alle
drei Sekunden erneut ab. Die URLs relativer generierter Dateien werden mit
der Backend-URL ergänzt. Über **Restart Test** gelangt der Nutzer zurück zu
`/test`.

### Frontend-API-Schicht

`src/api/client.ts` kapselt `fetch`, setzt JSON-Header und prüft HTTP-
Fehler. `src/api/api.ts` stellt dafür typisierte Funktionen bereit:

| Funktion                   | HTTP-Endpunkt                  | Verwendung                  |
| -------------------------- | ------------------------------ | --------------------------- |
| `searchSongs(query)`       | `GET /songs/name/{query}`      | Song-Autocomplete           |
| `getSongs()`               | `GET /songs/`                  | Vorgegebene Bewertungssongs |
| `getSong(id)`              | `GET /songs/{id}`              | Einzelnen Song laden        |
| `createMusicProfile(data)` | `POST /music-profile/generate` | Testdaten auswerten         |
| `getMusicProfile(testId)`  | `GET /music-profile/{testId}`  | Ergebnisse laden            |

## Backend

### `app/main.py`

`main.py` erstellt die FastAPI-Anwendung, aktiviert CORS, bindet die Router
ein und stellt das Verzeichnis `generated/` unter `/generated` als statische
Dateien bereit. Im Startup-Lifecycle wird `import_songs()` ausgeführt.

### API-Router

| Router       | Endpunkte                                                  | Aufgabe                                   |
| ------------ | ---------------------------------------------------------- | ----------------------------------------- |
| `songs.py`   | `GET /songs/`, `GET /songs/{id}`, `GET /songs/name/{name}` | Songliste, Einzelabfrage und Suche        |
| `profile.py` | `POST /music-profile/generate`, `GET /music-profile/{id}`  | Profil berechnen und Profilstatus liefern |
| `ai.py`      | `POST /ai/generate-image`, `POST /ai/generate-audio`       | Direkte Bild- und Musikgenerierung        |

Beim Profil-Request berechnet `calculate_profiles.py` die Big-Five-Werte.
`calculate_music_features.py` wertet die ausgewählten und bewerteten Songs
gegen die Datenbank aus. Die Module unter `translate/` erstellen daraus
Prompts für Audio und Bild. Die Services unter `backend/services/` rufen
anschließend Hugging Face beziehungsweise MusicGen und SciPy auf.

## Voraussetzungen

- Python 3.10 oder neuer
- Node.js und npm
- ein Hugging-Face-API-Key für die Bildgenerierung

## Installation

### Backend

Im Projektverzeichnis eine virtuelle Python-Umgebung erstellen und
aktivieren:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate       # Linux/macOS
# .venv\Scripts\activate       # Windows
pip install -r requirements.txt
```

Der API-Key und weitere Konfiguration werden in `backend/settings.env`
hinterlegt. Die Datei sollte nicht committed werden. Der verwendete
Variablenname für den Hugging-Face-Key ist `HUGGING_FACES_KEY`.

### Frontend

```bash
cd frontend
npm install
```

## Starten

Frontend und Backend werden in getrennten Terminals gestartet.

### Backend

Der Befehl wird aus dem Verzeichnis `backend/` ausgeführt, damit
`settings.env` gefunden wird:

```bash
cd backend
source .venv/bin/activate       # falls noch nicht aktiviert
uvicorn app.main:app --reload --env-file settings.env
```

Die API ist anschließend unter `http://127.0.0.1:8000` erreichbar. Die
interaktive API-Dokumentation befindet sich unter
`http://127.0.0.1:8000/docs`.

### Frontend

Für einen Produktions-Build:

```bash
cd frontend
npm run build
```

Für die Entwicklung mit Vite und Hot Reload:

```bash
cd frontend
npm run dev
```
