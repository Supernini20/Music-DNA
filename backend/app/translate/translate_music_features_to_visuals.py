from ..models.music_profile import MusicProfile


def music_profile_to_image_prompt(
    music_profile: MusicProfile,
) -> str:
    """
    Converts the MusicProfile into a visual interpretation
    suitable for an image-generation AI.
    """

    visual_concepts = []

    # --------------------------------------------------------
    # Favorites are the primary source of the visual identity
    # --------------------------------------------------------

    favorites = music_profile.favorites

    visual_concepts.extend(
        _interpret_mood(favorites.features)
    )

    visual_concepts.extend(
        _interpret_energy(favorites.features)
    )

    visual_concepts.extend(
        _interpret_danceability(favorites.features)
    )

    visual_concepts.extend(
        _interpret_complexity(favorites.features)
    )

    visual_concepts.extend(
        _interpret_authenticity(favorites.features)
    )

    visual_concepts.extend(
        _interpret_timeliness(favorites.features)
    )

    visual_concepts.extend(
        _interpret_tonality(favorites.features)
    )

    visual_concepts.extend(
        _interpret_voice(favorites.features)
    )

    visual_concepts.extend(
        _interpret_tempo(favorites.bpm)
    )

    visual_concepts.extend(
        _interpret_genres(favorites.genres)
    )

    # --------------------------------------------------------
    # Build prompt
    # --------------------------------------------------------

    lines = [
        "Create a visual representation of a person's musical identity.",
        "",
        "VISUAL CHARACTERISTICS:",
    ]

    for concept in visual_concepts:
        lines.append(f"- {concept}")

    lines.extend([
        "",
        "The image should feel coherent and artistic rather "
        "than like a literal visualization of music.",
        "Use the musical characteristics as inspiration for:",
        "- color atmosphere",
        "- lighting",
        "- environment",
        "- movement",
        "- texture",
        "- visual density",
        "- emotional expression",
        "- overall composition",
        "",
        "Do not display numerical values, graphs, charts, "
        "or technical music terminology in the image.",
    ])

    return "\n".join(lines)


# ============================================================
# MOOD
# ============================================================

def _interpret_mood(features) -> list[str]:
    value = _get_mean(features, "valence")

    if value is None:
        return []

    if value >= 0.75:
        return [
            "strongly positive and uplifting emotional atmosphere"
        ]

    if value >= 0.55:
        return [
            "warm, positive and emotionally balanced atmosphere"
        ]

    if value >= 0.35:
        return [
            "emotionally balanced atmosphere with some melancholy"
        ]

    return [
        "introspective, melancholic and emotionally darker atmosphere"
    ]


# ============================================================
# ENERGY
# ============================================================

def _interpret_energy(features) -> list[str]:
    value = _get_mean(features, "arousal")

    if value is None:
        return []

    if value >= 0.75:
        return [
            "high emotional energy",
            "dynamic and intense visual atmosphere",
            "strong contrasts and a sense of movement",
        ]

    if value >= 0.55:
        return [
            "moderately energetic atmosphere",
            "subtle visual movement",
        ]

    if value >= 0.35:
        return [
            "calm and restrained energy",
            "slow visual rhythm",
        ]

    return [
        "very calm and introspective energy",
        "still and contemplative visual atmosphere",
    ]


# ============================================================
# DANCEABILITY
# ============================================================

def _interpret_danceability(features) -> list[str]:
    value = _get_mean(features, "danceability")

    if value is None:
        return []

    if value >= 0.75:
        return [
            "strong rhythmic and physical character",
            "fluid movement and expressive body language",
        ]

    if value >= 0.55:
        return [
            "noticeable rhythmic character",
            "natural sense of movement",
        ]

    return [
        "less dance-oriented and more contemplative character"
    ]


# ============================================================
# COMPLEXITY
# ============================================================

def _interpret_complexity(features) -> list[str]:
    value = _get_mean(features, "complexity")

    if value is None:
        return []

    if value >= 0.75:
        return [
            "high visual complexity",
            "layered textures and intricate details",
            "rich and multifaceted composition",
        ]

    if value >= 0.55:
        return [
            "moderately detailed and layered visual composition",
        ]

    if value >= 0.35:
        return [
            "relatively simple and balanced visual composition",
        ]

    return [
        "minimal and uncluttered visual composition",
        "strong use of negative space",
    ]


# ============================================================
# AUTHENTICITY
# ============================================================

def _interpret_authenticity(features) -> list[str]:
    value = _get_mean(features, "authenticity")

    if value is None:
        return []

    if value >= 0.75:
        return [
            "raw, authentic and human visual character",
            "organic textures and imperfect details",
        ]

    if value >= 0.55:
        return [
            "natural and emotionally authentic appearance",
        ]

    return [
        "polished and carefully constructed visual appearance",
    ]


# ============================================================
# TIMELINESS
# ============================================================

def _interpret_timeliness(features) -> list[str]:
    value = _get_mean(features, "timeliness")

    if value is None:
        return []

    if value >= 0.75:
        return [
            "contemporary and forward-looking aesthetic",
            "modern visual language",
        ]

    if value >= 0.55:
        return [
            "modern aesthetic with some timeless qualities",
        ]

    return [
        "timeless or nostalgic visual character",
    ]


# ============================================================
# TONALITY
# ============================================================

def _interpret_tonality(features) -> list[str]:
    value = _get_mean(features, "tonal")

    if value is None:
        return []

    if value >= 0.75:
        return [
            "clear and harmonious visual structure",
            "cohesive forms and balanced composition",
        ]

    if value >= 0.5:
        return [
            "balanced and coherent visual structure",
        ]

    return [
        "more ambiguous and atmospheric visual forms",
    ]


# ============================================================
# VOICE
# ============================================================

def _interpret_voice(features) -> list[str]:
    value = _get_mean(features, "voice")

    if value is None:
        return []

    if value >= 0.75:
        return [
            "strong human and expressive presence",
            "intimate and personal atmosphere",
        ]

    if value >= 0.5:
        return [
            "noticeable human presence",
        ]

    return [
        "more instrumental or abstract character",
    ]


# ============================================================
# BPM
# ============================================================

def _interpret_tempo(bpm) -> list[str]:
    if bpm.mean is None:
        return []

    if bpm.mean >= 130:
        return [
            "fast visual rhythm",
            "sense of motion and momentum",
        ]

    if bpm.mean >= 110:
        return [
            "moderately fast visual rhythm",
            "active and flowing sense of movement",
        ]

    if bpm.mean >= 90:
        return [
            "moderate visual rhythm",
            "steady and natural sense of movement",
        ]

    if bpm.mean >= 70:
        return [
            "slow and relaxed visual rhythm",
        ]

    return [
        "very slow, spacious and contemplative visual rhythm",
    ]


# ============================================================
# GENRES
# ============================================================

def _interpret_genres(genres) -> list[str]:
    if not genres.top3_genres:
        return []

    genre_mapping = {
        "Pop": "accessible, colorful and expressive visual elements",
        "Rock": "raw textures, strong contrast and rebellious energy",
        "Electronic": "futuristic, abstract and luminous visual elements",
        "Hip-Hop": "urban atmosphere, strong graphic forms and confident attitude",
        "RnB": "smooth, intimate and sensual visual atmosphere",
        "Soul": "warm, human and emotionally rich visual character",
        "Jazz": "sophisticated, spontaneous and atmospheric visual language",
        "Classical": "elegant, structured and timeless visual composition",
        "Metal": "dark, intense and dramatic visual atmosphere",
        "Indie": "alternative, intimate and unconventional visual character",
        "Folk": "organic, earthy and natural visual elements",
        "Country": "warm, grounded and rural visual atmosphere",
        "Ambient": "spacious, dreamy and ethereal visual atmosphere",
        "Punk": "raw, rebellious and unconventional visual character",
    }

    concepts = []

    for genre in genres.top3_genres:
        if genre in genre_mapping:
            concepts.append(
                genre_mapping[genre]
            )

    return concepts


# ============================================================
# HELPERS
# ============================================================

def _get_mean(features, feature_name: str):
    statistics = features.get(feature_name)

    if statistics is None:
        return None

    return statistics.mean