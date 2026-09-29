from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from fastapi.staticfiles import StaticFiles

from .database import Base, engine
from .routers import songs
from .routers import ai
from .routers import profile
from .import_songs import import_songs



Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starte Song-Import...")
    try:
        import_songs()
    except Exception as e:
        print(f"Fehler beim Song-Import: {e}")
    yield
    # Shutdown (aktuell nichts zu tun)


app = FastAPI(
    title="Music-DNA API",
    description="Backend für die Music-DNA Anwendung",
    version="1.0.0",
    lifespan=lifespan
)

BASE_DIR = Path(__file__).parent.parent.resolve()
GENERATED_DIR = BASE_DIR / "generated"

app.mount(
    "/generated",
    StaticFiles(directory=GENERATED_DIR),
    name="generated",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(songs.router)
app.include_router(ai.router)
app.include_router(profile.router)


@app.get("/")
def root():
    return {
        "message": "Music-DNA API is running"
    }
