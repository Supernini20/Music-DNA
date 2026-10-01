def aponit_field_to_value(value):
    if value <= 2.33:
        return "niedrig"
    if value >= 3.66:
        return "hoch"
    else:
        return "mittel"

TABELLE = {
    "O": {
        "niedrig": "realistic, conventional style, natural muted colors, familiar everyday subjects",
        "mittel": "slightly stylized, balanced palette with accents, familiar subjects with subtle twists",
        "hoch": "bold abstract interpretation, symbolic associations, unusual perspective, and creative visual freedom",
    },
    "G": {
        "niedrig": "open-ended composition with irregular placement and loose visual hierarchy",
        "mittel": "balanced composition with moderate structure and a readable visual hierarchy",
        "hoch": "precise composition, deliberate spacing, clean relationships, and strong visual hierarchy",
    },
    "E": {
        "niedrig": "quiet visual intensity, restrained movement, and a focused field of elements",
        "mittel": "moderate visual intensity with balanced expressive movement",
        "hoch": "strong visual intensity, expansive movement, expressive gestures, and vivid lighting",
    },
    "V": {
        "niedrig": "reserved atmosphere with firm edges and controlled, non-organic forms",
        "mittel": "even atmosphere with a balanced relationship between soft and defined forms",
        "hoch": "warm approachable atmosphere, soft transitions, and organic flowing forms",
    },
    "N": {
        "niedrig": "stable atmosphere, smooth texture, and gentle contrast",
        "mittel": "subtle emotional tension, varied texture, and moderate contrast",
        "hoch": "dramatic emotional tension, fractured texture, and strong atmospheric contrast",
    },
}

def big5_to_prompt(scores: dict) -> str:
    responsibilities = {
        "O": "ABSTRACTION AND SYMBOLISM",
        "G": "COMPOSITION AND HIERARCHY",
        "E": "INTENSITY AND MOVEMENT",
        "V": "WARMTH AND FORM",
        "N": "EMOTIONAL TENSION AND ATMOSPHERE",
    }
    lines = ["PERSONALITY VISUAL EXPRESSION"]

    for dimension in ("O", "G", "E", "V", "N"):
        if dimension not in scores:
            continue
        level = aponit_field_to_value(scores[dimension])
        lines.append(f"{responsibilities[dimension]}: {TABELLE[dimension][level]}")

    return "\n".join(lines)