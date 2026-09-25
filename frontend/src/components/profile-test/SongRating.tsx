import { Box, Card, Divider, Rating, Typography } from "@mui/material";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { useState } from "react";

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

const songsToRate: RatingSong[] = [
  {
    trackId: "rating-1",
    title: "Midnight City",
    artist: "M83",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    trackId: "rating-2",
    title: "Teardrop",
    artist: "Massive Attack",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    trackId: "rating-3",
    title: "Sweet Disposition",
    artist: "The Temper Trap",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export function SongRating({ onChange }: SongRatingProps) {
  const [ratings, setRatings] = useState<
    Record<string, SongRatingValue["rating"]>
  >({});

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
        Listen to a short excerpt of each song and rate how much you like it.
      </Typography>

      <Box>
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
        <Typography variant="body2" color="text.secondary">
          How much do you like this song?
        </Typography>

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
