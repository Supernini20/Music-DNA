
from statistics import mean, stdev
from sqlalchemy.orm import Session

from ..models.music_profile import BPMStatistics, FeatureStatistics, Genres, Music, MusicEvaluation, MusicProfile, Track
from app import crud


# ============================================================
# Configuration
# ============================================================

# Calculate mean and standard deviation for these features.
CONTINUOUS_FEATURES = [
    "valence",
    "arousal",
    "danceability",
    "voice",
    "female",
    "authenticity",
    "timeliness",
    "complexity",
    "tonal",
]



# ============================================================
# Main function
# ============================================================

def evaluate_music_features(
    music: Music,
    db: Session,
) -> MusicProfile:
    tracks = load_tracks(music, db)

    favorite_ids = {
        str(track_id)
        for track_id in music.favoriteSongs
    }

    rated_songs = {
        str(song.trackId): song.rating
        for song in music.ratedSongs
    }

    favorite_tracks = [
        track
        for track in tracks
        if str(track.id) in favorite_ids
    ]

    rated_tracks = [
        track
        for track in tracks
        if str(track.id) in rated_songs
    ]
  
    favorite_profile = evaluate_favorite_tracks(
        favorite_tracks
    )

    rated_profile = evaluate_rated_tracks(
        rated_tracks,
        rated_songs
    )

    favorite_genres = evaluate_genres(
        favorite_tracks
    )

    rated_genres = evaluate_weighted_genres(
        rated_tracks,
        rated_songs
    )

    return MusicProfile(
        identifiesWith=music.identifiesWith,

        favorites=MusicEvaluation(
            features={
                name: FeatureStatistics(**values)
                for name, values
                in favorite_profile["features"].items()
            },
            bpm=BPMStatistics(
                **favorite_profile["bpm"]
            ),
            genres=favorite_genres,
        ),

        rated=MusicEvaluation(
            features={
                name: FeatureStatistics(**values)
                for name, values
                in rated_profile["features"].items()
            },
            bpm=BPMStatistics(
                **rated_profile["bpm"]
            ),
            genres=rated_genres,
        ),
    )

# ============================================================
# FAVORITE SONGS
# ============================================================

def evaluate_favorite_tracks(
    tracks: list[Track],
) -> dict:
    """
    Calculate statistics for the user's favorite songs.
    Every favorite song has the same weight.
    """

    feature_result = {}

    for feature_name in CONTINUOUS_FEATURES:
        values = get_feature_values(
            tracks,
            feature_name
        )

        feature_result[feature_name] = evaluate_feature(
            values
        )

    bpm_values = get_feature_values(
        tracks,
        "bpm"
    )

    return {
        "features": feature_result,
        "bpm": evaluate_bpm(bpm_values),
    }


# ============================================================
# RATED SONGS
# ============================================================

def evaluate_rated_tracks(
    tracks: list[Track],
    ratings: dict[str, int],
) -> dict:
    """
    Calculate rating-weighted statistics for predefined songs.

    Rating:
        1 = lowest preference
        5 = highest preference

    The rating is used directly as the weight.

    weighted_mean = sum(feature_value * rating) / sum(rating)

    The standard deviation is calculated unweighted because
    the primary purpose of the rating is to determine which
    songs contribute more strongly to the user's preference
    profile.
    """

    feature_result = {}

    for feature_name in CONTINUOUS_FEATURES:
        values_and_weights = get_values_and_weights(
            tracks,
            ratings,
            feature_name
        )

        values = values_and_weights["values"]
        weights = values_and_weights["weights"]

        feature_result[feature_name] = evaluate_weighted_feature(
            values,
            weights
        )

    # BPM separat behandeln
    bpm_values_and_weights = get_values_and_weights(
        tracks,
        ratings,
        "bpm"
    )

    return {
        "features": feature_result,
        "bpm": evaluate_weighted_bpm(
            bpm_values_and_weights["values"],
            bpm_values_and_weights["weights"]
        ),
    }


# ============================================================
# CONTINUOUS FEATURES
# ============================================================

def get_feature_values(
    tracks: list[Track],
    feature_name: str,
) -> list[float]:
    """
    Extract one feature from all tracks.
    Features are stored inside track.features.
    """

    values = []

    for track in tracks:
        value = getattr(track, feature_name)

        if value is not None:
            values.append(float(value))

    return values


def get_values_and_weights(
    tracks: list[Track],
    ratings: dict[str, int],
    feature_name: str,
) -> dict:
    """
    Extract feature values and their corresponding user ratings.
    """

    values = []
    weights = []

    for track in tracks:
        track_id = str(track.id)

        if track_id not in ratings:
            continue

        value = getattr(track, feature_name)

        if value is None:
            continue

        rating = ratings[track_id]

        if rating < 1 or rating > 5:
            continue

        values.append(float(value))
        weights.append(float(rating))

    return {
        "values": values,
        "weights": weights,
    }


def evaluate_feature(
    features: list[float],
) -> dict:
    """
    Calculate ordinary mean and standard deviation.

    Used for favorite songs where every song has equal weight.
    """

    if not features:
        return {
            "mean": None,
            "std": None,
        }

    if len(features) == 1:
        return {
            "mean": features[0],
            "std": 0.0,
        }

    return {
        "mean": mean(features),
        "std": stdev(features),
    }


def evaluate_weighted_feature(
    values: list[float],
    weights: list[float],
) -> dict:
    """
    Calculate a rating-weighted mean.

    Rating 5 contributes five times as much as rating 1.

    Standard deviation is kept unweighted and describes the
    variability of the selected songs themselves.
    """

    if not values:
        return {
            "mean": None,
            "std": None,
        }

    if len(values) != len(weights):
        raise ValueError(
            "Number of feature values and weights must match."
        )

    total_weight = sum(weights)

    if total_weight == 0:
        return {
            "mean": mean(values),
            "std": stdev(values) if len(values) > 1 else 0.0,
        }

    weighted_mean = sum(
        value * weight
        for value, weight in zip(values, weights)
    ) / total_weight

    return {
        "mean": weighted_mean,
        "std": stdev(values) if len(values) > 1 else 0.0,
    }


# ============================================================
# BPM
# ============================================================

def evaluate_bpm(
    bpm_values: list[float],
) -> dict:
    """
    Evaluate BPM for favorite songs.

    BPM is kept in its original unit (beats per minute).
    """

    if not bpm_values:
        return {
            "mean": None,
            "std": None,
            "min": None,
            "max": None,
        }

    return {
        "mean": mean(bpm_values),
        "std": stdev(bpm_values) if len(bpm_values) > 1 else 0.0,
        "min": min(bpm_values),
        "max": max(bpm_values),
    }


def evaluate_weighted_bpm(
    values: list[float],
    weights: list[float],
) -> dict:
    """
    Calculate rating-weighted BPM.

    BPM remains in beats per minute and is not normalized.
    """

    if not values:
        return {
            "mean": None,
            "std": None,
            "min": None,
            "max": None,
        }

    total_weight = sum(weights)

    if total_weight == 0:
        weighted_mean = mean(values)
    else:
        weighted_mean = sum(
            value * weight
            for value, weight in zip(values, weights)
        ) / total_weight

    return {
        "mean": weighted_mean,
        "std": stdev(values) if len(values) > 1 else 0.0,
        "min": min(values),
        "max": max(values),
    }


# ============================================================
# GENRES
# ============================================================

def evaluate_genres(
    tracks: list[Track],
) -> Genres:
    """
    Calculate genre distribution for favorite songs.

    Each song contributes equally.

    A genre is counted using the top3_genres predicted for
    each song.
    """

    if not tracks:
        return Genres(
            all_genres={},
            top3_genres={}
        )

    genre_counts = {}

    for track in tracks:
        genres = get_top_genres(track)

        for genre in genres:
            genre_counts[genre] = (
                genre_counts.get(genre, 0) + 1
            )

    number_of_songs = len(tracks)

    genre_percentages = {
        genre: count / number_of_songs
        for genre, count in genre_counts.items()
    }

    sorted_genres = sorted(
        genre_percentages.items(),
        key=lambda item: item[1],
        reverse=True
    )

    return Genres(
        all_genres=dict(sorted_genres),
        top3_genres=dict(sorted_genres[:3])
    )


def evaluate_weighted_genres(
    tracks: list[Track],
    ratings: dict[str, int],
) -> Genres:
    """
    Calculate a rating-weighted genre distribution.

    A genre occurring in a highly rated song contributes more
    strongly than the same genre occurring in a poorly rated song.

    Example:

        Song A -> Hip-Hop -> rating 5
        Song B -> Hip-Hop -> rating 1

    Hip-Hop receives a total weight of 6.
    """

    if not tracks:
        return Genres(
            all_genres={},
            top3_genres={}
        )

    genre_weights = {}
    total_weight = 0.0

    for track in tracks:
        track_id = str(track.id)

        if track_id not in ratings:
            continue

        rating = ratings[track_id]

        if rating < 1 or rating > 5:
            continue

        genres = get_top_genres(track)

        for genre in genres:
            genre_weights[genre] = (
                genre_weights.get(genre, 0.0)
                + rating
            )

        total_weight += rating

    if total_weight == 0:
        return Genres(
            all_genres={},
            top3_genres={}
        )

    genre_percentages = {
        genre: weight / total_weight
        for genre, weight in genre_weights.items()
    }

    sorted_genres = sorted(
        genre_percentages.items(),
        key=lambda item: item[1],
        reverse=True
    )

    return Genres(
        all_genres=dict(sorted_genres),
        top3_genres=dict(sorted_genres[:3])
    )


def get_top_genres(
    track: Track,
) -> list[str]:
    """
    Get the names of the top genres of a track.

    The database structure contains:

        track.features.genres.top3_genres

    where top3_genres is a dictionary such as:

        {
            "Hip-Hop": 0.78,
            "RnB": 0.04,
            "Soul": 0.04
        }
    """

    genres = track.genres

    if not genres:
        return []

    top3 = genres.get("top3_genres", {})

    if isinstance(top3, dict):
        return list(top3.keys())

    return []


# ============================================================
# DATABASE
# ============================================================

def load_tracks(
    music: Music,
    db: Session,
) -> list[Track]:
    """
    Load all tracks required for the music profile.

    Includes:
        - favorite songs
        - predefined rated songs
    """

    track_ids = (
        list(music.favoriteSongs)
        + [
            song.trackId
            for song in music.ratedSongs
        ]
    )

    # Remove duplicates
    track_ids = list(dict.fromkeys(track_ids))

    if not track_ids:
        return []

    return crud.get_songs_by_id(
        db,
        track_ids
    )
