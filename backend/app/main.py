from fastapi import FastAPI

from .database import Base, engine
from .routers import songs
from app.routers import ai

from routers import profile


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Music-DNA API",
    description="Backend für die Music-DNA Anwendung",
    version="1.0.0"
)


app.include_router(songs.router)
app.include_router(ai.router)
app.include_router(profile.router)


@app.get("/")
def root():
    return {
        "message": "Music-DNA API is running"
    }