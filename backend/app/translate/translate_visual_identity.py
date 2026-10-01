from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class VisualIdentity:
    core_mood: str
    visual_style: str
    composition: str
    color_palette: str
    movement: str
    texture: str
    emotional_character: str
    visual_metaphor: str


def build_visual_identity(
    music_visuals: str,
    personality_visuals: str,
) -> VisualIdentity:
    music = _sections(music_visuals)
    personality = _sections(personality_visuals)

    return VisualIdentity(
        core_mood=music.get("MOOD", "an emotionally coherent atmosphere"),
        visual_style=(
            f"{music.get('AESTHETIC', 'a contemporary visual language')}; "
            f"{personality.get('ABSTRACTION AND SYMBOLISM', 'symbolic but coherent interpretation')}"
        ),
        composition=personality.get(
            "COMPOSITION AND HIERARCHY",
            "a balanced composition with a clear focal point",
        ),
        color_palette=(
            f"{music.get('PALETTE', 'a restrained, contemporary palette')}; "
            f"{personality.get('WARMTH AND FORM', 'balanced forms and transitions')}"
        ),
        movement=(
            f"{music.get('MOVEMENT', 'measured visual rhythm')}; "
            f"{personality.get('INTENSITY AND MOVEMENT', 'controlled expressive movement')}"
        ),
        texture=music.get("TEXTURE", "layered but intentional texture"),
        emotional_character=(
            f"{music.get('MOOD', 'an emotionally coherent atmosphere')}; "
            f"{personality.get('EMOTIONAL TENSION AND ATMOSPHERE', 'subtle emotional depth')}"
        ),
        visual_metaphor=(
            "A single symbolic environment whose forms, light, and spatial rhythm "
            "suggest an inner world rather than depicting music literally."
        ),
    )


def build_image_prompt(identity: VisualIdentity) -> str:
    fields = asdict(identity)
    lines = [
        "Create an abstract artistic representation of an individual's inner world.",
        "Build one coherent visual environment with a clear focal point and art-directed relationships between color, lighting, texture, movement, and composition.",
    ]
    lines.extend(f"{name.replace('_', ' ').upper()}: {value}" for name, value in fields.items())
    lines.extend([
        "Use symbolic storytelling and contemporary conceptual-art direction, not a literal music visualization.",
        "Avoid charts, graphs, numerical values, generic music notes, personality-test graphics, collages of unrelated elements, text, labels, lettering, and generic stock-image aesthetics.",
    ])
    return "\n".join(lines)


def _sections(prompt: str) -> dict[str, str]:
    sections = {}
    for line in prompt.splitlines():
        if ": " in line:
            name, value = line.split(": ", 1)
            sections[name] = value
    return sections