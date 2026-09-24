import os
import scipy.io.wavfile
from transformers import AutoProcessor, MusicgenForConditionalGeneration


processor = None
model = None


def load_model():
    global processor, model

    if model is None:
        print("Loading MusicGen model...")

        processor = AutoProcessor.from_pretrained(
            "facebook/musicgen-small"
        )

        model = MusicgenForConditionalGeneration.from_pretrained(
            "facebook/musicgen-small"
        )


def generate_music(prompt: str, duration_tokens: int = 512):
    load_model()

    inputs = processor(
        text=[prompt],
        padding=True,
        return_tensors="pt"
    )

    audio_values = model.generate(
        **inputs,
        max_new_tokens=duration_tokens
    )

    sampling_rate = model.config.audio_encoder.sampling_rate

    return audio_values[0, 0].numpy(), sampling_rate


    
    
def save_audio(audio_array, sampling_rate, filename: str):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    scipy.io.wavfile.write(filename, rate=sampling_rate, data=audio_array)