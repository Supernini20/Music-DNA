from fastapi import FastAPI

from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Music DNA API")


@app.get("/")
def root():
    return {"message": "Music DNA API läuft!"}