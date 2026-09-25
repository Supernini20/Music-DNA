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
import { searchSongs } from "../../api/api";
import type { Track } from "../../types";

export interface Song {
  id: string;
  title: string;
  artist: string;
}

type SongSelectionProps = {
  onChange?: (songs: Song[]) => void;
};

export function SongSelection({ onChange }: SongSelectionProps) {
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [options, setOptions] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const updateSelectedSongs = (songs: Song[]) => {
    setSelectedSongs(songs);
    onChange?.(songs);
  };

  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const tracks = await searchSongs(query.trim());
      setOptions(
        tracks.map((track: Track) => ({
          id: String(track.id),
          title: track.title,
          artist: track.artist,
        })),
      );
    } finally {
      setLoading(false);
    }
  };

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

    updateSelectedSongs([...selectedSongs, song]);
  };

  const handleSongRemove = (songId: string): void => {
    updateSelectedSongs(selectedSongs.filter((song) => song.id !== songId));
  };

  const remainingSongs = options.filter(
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
        loading={loading}
        onInputChange={(_, value) => void handleSearch(value)}
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
