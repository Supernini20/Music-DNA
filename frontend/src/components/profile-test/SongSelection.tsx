import {
  Autocomplete,
  Box,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
}

// Temporäre Fake-Daten.
// Später können diese Daten durch eine Backend-Suche ersetzt werden.
const availableSongs: Song[] = [
  {
    id: "1",
    title: "Everything In Its Right Place",
    artist: "Radiohead",
  },
  {
    id: "2",
    title: "Midnight City",
    artist: "M83",
  },
  {
    id: "3",
    title: "Teardrop",
    artist: "Massive Attack",
  },
  {
    id: "4",
    title: "Intro",
    artist: "The xx",
  },
  {
    id: "5",
    title: "Roads",
    artist: "Portishead",
  },
  {
    id: "6",
    title: "No Surprises",
    artist: "Radiohead",
  },
  {
    id: "7",
    title: "Kids",
    artist: "MGMT",
  },
  {
    id: "8",
    title: "Sweet Disposition",
    artist: "The Temper Trap",
  },
  {
    id: "9",
    title: "505",
    artist: "Arctic Monkeys",
  },
  {
    id: "10",
    title: "Space Song",
    artist: "Beach House",
  },
];

export function SongSelection() {
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([
    availableSongs[0],
    availableSongs[1],
  ]);

  const handleSongSelect = (
    _: React.SyntheticEvent,
    song: Song | null,
  ): void => {
    if (!song) {
      return;
    }

    if (selectedSongs.some((selected) => selected.id === song.id)) {
      return;
    }

    if (selectedSongs.length >= 3) {
      return;
    }

    setSelectedSongs((current) => [...current, song]);
  };

  const handleSongRemove = (songId: string): void => {
    setSelectedSongs((current) => current.filter((song) => song.id !== songId));
  };

  const remainingSongs = availableSongs.filter(
    (song) => !selectedSongs.some((selected) => selected.id === song.id),
  );

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
        <MusicNoteIcon color="primary" />

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          Choose your songs
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose three songs that say something about you.
      </Typography>

      <Autocomplete
        options={remainingSongs}
        value={null}
        disabled={selectedSongs.length >= 3}
        onChange={handleSongSelect}
        getOptionLabel={(song: Song) => `${song.title} — ${song.artist}`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText="No songs found"
        renderOption={(props, song) => (
          <Box
            component="li"
            {...props}
            key={song.id}
            sx={{
              display: "flex !important",
              flexDirection: "column",
              alignItems: "flex-start !important",
              py: "10px !important",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {song.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {song.artist}
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Search for a song"
            placeholder={
              selectedSongs.length >= 3
                ? "You selected three songs"
                : "Artist or song title"
            }
          />
        )}
      />

      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Selected songs
          </Typography>

          <Typography
            variant="body2"
            color={
              selectedSongs.length === 3 ? "primary.main" : "text.secondary"
            }
            sx={{ fontWeight: 600 }}
          >
            {selectedSongs.length} / 3
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {selectedSongs.map((song) => (
            <SelectedSong
              key={song.id}
              song={song}
              onRemove={handleSongRemove}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}

interface SelectedSongProps {
  song: Song;
  onRemove: (songId: string) => void;
}

function SelectedSong({ song, onRemove }: SelectedSongProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: "action.hover",
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {song.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {song.artist}
        </Typography>
      </Box>

      <IconButton
        size="small"
        aria-label={`Remove ${song.title}`}
        onClick={() => onRemove(song.id)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
