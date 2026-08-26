import os
from dotenv import load_dotenv
from pathlib import Path
from huggingface_hub import InferenceClient

# Sucht .env relativ zu dieser Datei, unabhängig vom Arbeitsverzeichnis
load_dotenv(dotenv_path=Path(__file__).with_name(".env"))

client = InferenceClient(
    provider="nscale",
    api_key=os.environ["HUGGING_FACES_KEY"],
)

def generate_image(prompt: str):
    image = client.text_to_image(
        prompt,
        model="black-forest-labs/FLUX.1-schnell",
    )

    return image