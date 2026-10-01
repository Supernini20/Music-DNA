from ..models.music_profile import MusicProfile


def music_profile_to_sound_prompt(
    music_profile: MusicProfile,
) -> str:
    """
    Converts the MusicProfile into a prompt/data description
    for a sound/music generation AI.

    Numerical feature values are intentionally preserved because
    the sound AI can work with the original measurements.
    """

    lines = []

    lines.append("SOUND GENERATION DIRECTION")
    lines.append("==========================")
    lines.append(
        "Create one original, cohesive piece of music that feels personally "
        "tailored to this listener's taste."
    )
    lines.append(
        "Use the FAVORITE SONGS profile as the primary creative direction and "
        "the RATED SONGS profile as supporting evidence."
    )
    lines.append(
        "Translate the measurements into audible choices such as mood, energy, "
        "tempo, vocal presence, instrumentation, groove, harmony, and texture."
    )
    lines.append(
        "Favor a clear musical identity and a satisfying progression over a "
        "literal or mechanical reproduction of the numbers."
    )
    lines.append(
        "The result should be a complete listenable track, not an explanation "
        "of the profile or a list of settings. Do not imitate or copy any "
        "specific existing song."
    )

    lines.append("")
    lines.append("MUSIC PROFILE")
    lines.append("==============")

    lines.append(
        f"Identifies with: "
        f"{music_profile.identifiesWith}"
    )

    # --------------------------------------------------------
    # Favorites
    # --------------------------------------------------------

    lines.append("")
    lines.append("FAVORITE SONGS")
    lines.append("--------------")

    lines.extend(
        _features_to_lines(
            music_profile.favorites.features
        )
    )

    lines.append(
        _bpm_to_line(
            music_profile.favorites.bpm
        )
    )

    lines.append(
        _genres_to_line(
            music_profile.favorites.genres
        )
    )

    # --------------------------------------------------------
    # Rated songs
    # --------------------------------------------------------

    lines.append("")
    lines.append("RATED SONGS")
    lines.append("-----------")

    lines.extend(
        _features_to_lines(
            music_profile.rated.features
        )
    )

    lines.append(
        _bpm_to_line(
            music_profile.rated.bpm
        )
    )

    lines.append(
        _genres_to_line(
            music_profile.rated.genres
        )
    )

    return "\n".join(lines)


def _features_to_lines(features) -> list[str]:
    lines = []

    for feature_name, statistics in features.items():

        if statistics.mean is None:
            continue

        line = (
            f"{feature_name}: "
            f"mean={statistics.mean:.4f}"
        )

        if statistics.std is not None:
            line += f", std={statistics.std:.4f}"

        lines.append(line)

    return lines


def _bpm_to_line(bpm) -> str:
    if bpm.mean is None:
        return "bpm: no data"

    return (
        f"bpm: mean={bpm.mean:.2f}, "
        f"std={bpm.std:.2f}, "
        f"min={bpm.min:.2f}, "
        f"max={bpm.max:.2f}"
    )


def _genres_to_line(genres) -> str:
    if not genres.top3_genres:
        return "genres: no data"

    genres_text = ", ".join(
        f"{genre}={value:.4f}"
        for genre, value in genres.all_genres.items()
    )

    return f"genres: {genres_text}"