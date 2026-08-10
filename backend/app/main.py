from fastapi import FastAPI

from .database import Base, engine
from .routers import songs


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Music-DNA API",
    description="Backend für die Music-DNA Anwendung",
    version="1.0.0"
)


app.include_router(songs.router)


@app.get("/")
def root():
    return {
        "message": "Music-DNA API is running"
    }