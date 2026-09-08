import os
from dotenv import load_dotenv
from pathlib import Path
from huggingface_hub import InferenceClient

# Sucht .env relativ zu dieser Datei, unabhängig vom Arbeitsverzeichnis
load_dotenv(dotenv_path=Path(__file__).with_name(".env"))

client = InferenceClient(
    provider="fal-ai",
    api_key=os.environ.get("HUGGING_FACES_KEY", ""),
)


def generate_music(prompt: str):
    audio = client.text_to_audio(
        prompt,
        model="stabilityai/stable-audio-3-medium",
    )

    return audio