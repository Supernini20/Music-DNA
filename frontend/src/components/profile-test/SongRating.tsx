import { Alert, Box, Card, Divider, Rating, Typography } from "@mui/material";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { useEffect, useState } from "react";
import { getSongs } from "../../api/api";
import type { Track } from "../../types";

const RATING_TRACK_IDS = [
  "6421ac0d672791ee89603fcb",
  "6421bb50672791ee89603ffa",
  "6421be57672791ee89604002",
  "6421c36d672791ee89604011",
  "6421d0c1672791ee89604042",
  "6421e92f672791ee89604089",
  "6421ef27672791ee8960409d",
] as const;

interface RatingSong {
  trackId: string;
  title: string;
  artist: string;
  previewUrl: string;
}

export type SongRatingValue = {
  trackId: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

type SongRatingProps = {
  onChange?: (ratings: SongRatingValue[]) => void;
};

export function SongRating({ onChange }: SongRatingProps) {
  const [songsToRate, setSongsToRate] = useState<RatingSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<
    Record<string, SongRatingValue["rating"]>
  >({});

  useEffect(() => {
    getSongs()
      .then((tracks: Track[]) => {
        const tracksByExternalId = new Map(
          tracks.map((track) => [track.external_id, track]),
        );

        setSongsToRate(
          RATING_TRACK_IDS.map((externalId) => {
            const track = tracksByExternalId.get(externalId);

            if (!track) return null;

            return {
              trackId: String(track.id),
              title: track.title,
              artist: track.artist,
              previewUrl: `/${externalId}.mp3`,
            };
          }).filter((song): song is RatingSong => song !== null),
        );
      })
      .catch(() => {
        setLoadError(
          "We could not load the rating songs. Make sure the backend is running on localhost:8000.",
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleRating = (trackId: string, value: number | null) => {
    if (!value) return;
    const nextRatings = {
      ...ratings,
      [trackId]: value as SongRatingValue["rating"],
    };
    setRatings(nextRatings);
    onChange?.(
      Object.entries(nextRatings).map(([id, rating]) => ({
        trackId: id,
        rating,
      })),
    );
  };

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        mb: 4,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <GraphicEqIcon color="primary" />

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          How do you like these songs?
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Listen to each song and rate how much you like it.
      </Typography>

      {isLoading && (
        <Typography color="text.secondary">Loading songs...</Typography>
      )}

      {loadError && <Alert severity="error">{loadError}</Alert>}

      {!isLoading && !loadError && songsToRate.length === 0 && (
        <Alert severity="warning">
          The rating songs were not found in the database.
        </Alert>
      )}

      <Box
        sx={{
          display:
            isLoading || loadError || songsToRate.length === 0
              ? "none"
              : "block",
        }}
      >
        {songsToRate.map((song, index) => (
          <Box key={song.trackId}>
            <SongRatingItem
              song={song}
              rating={ratings[song.trackId]}
              onRatingChange={handleRating}
            />

            {index < songsToRate.length - 1 && <Divider sx={{ my: 4 }} />}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

interface SongRatingItemProps {
  song: RatingSong;
  rating?: SongRatingValue["rating"];
  onRatingChange: (trackId: string, value: number | null) => void;
}

function SongRatingItem({ song, rating, onRatingChange }: SongRatingItemProps) {
  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
        }}
      >
        {song.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {song.artist}
      </Typography>

      {/* Audio preview */}
      <Box
        component="audio"
        controls
        src={song.previewUrl}
        sx={{
          width: "100%",
          mb: 3,
        }}
      />

      {/* Rating */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Rating
          name={`rating-${song.trackId}`}
          value={rating ?? null}
          max={5}
          size="large"
          precision={1}
          onChange={(_, value) => onRatingChange(song.trackId, value)}
        />

        <Typography variant="caption" color="text.secondary">
          1 = Not at all&nbsp;&nbsp;&nbsp;&nbsp;5 = Love it
        </Typography>
      </Box>
    </Box>
  );
}
