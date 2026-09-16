input = {'E': 4.33, 'V': 4.33, 'G': 4.0, 'N': 3.33, 'O': 4.67}

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
        "hoch": "surreal, experimental, abstract style, unusual high-contrast colors, dreamlike symbolic elements, unconventional perspective",
    },
    "G": {
        "niedrig": "chaotic, spontaneous composition, rough sketchy detail, loose irregular layout",
        "mittel": "semi-structured composition, medium precision, slightly organized layout",
        "hoch": "symmetrical composition, clean lines, high precision, sharp edges, balanced grid-like layout",
    },
    "E": {
        "niedrig": "muted cool saturation, static minimalist composition, few elements, weak diffuse light",
        "mittel": "moderate saturation, balanced movement, medium light intensity",
        "hoch": "bold saturated warm colors, dynamic composition with movement, multiple elements, bright direct high-contrast light",
    },
    "V": {
        "niedrig": "cool hard distant tones, angular unapproachable atmosphere, sharp geometric shapes",
        "mittel": "neutral tones, calm atmosphere, mixed shapes",
        "hoch": "soft warm pastel tones, inviting gentle atmosphere, organic flowing shapes",
    },
    "N": {
        "niedrig": "smooth calm texture, low contrast, relaxed stable mood",
        "mittel": "slightly rough texture, moderate contrast, subtle tension without dominance",
        "hoch": "chaotic cracked texture, strong contrast/unrest, dramatic unstable mood",
    },
}

def big5_to_prompt(scores: dict) -> str:   
    prompt = ["Hier kommt vorgefertigter Text \n"]
    for dim,val in scores.items():
        score = aponit_field_to_value(val)
        print(dim, val, score)
        prompt.append(TABELLE[dim][score])
    return ", ".join(prompt)

print(big5_to_prompt(input))