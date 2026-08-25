import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloseIcon from "@mui/icons-material/Close";

interface Song {
  id: string;
  title: string;
  artist: string;
}

const selectedSongs: Song[] = [
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
];

export function SongSelection() {
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

      <TextField
        fullWidth
        label="Search for a song"
        placeholder="Artist or song title"
        variant="outlined"
      />

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Selected songs
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {selectedSongs.map((song) => (
            <SelectedSong key={song.id} song={song} />
          ))}
        </Box>
      </Box>
    </Card>
  );
}

interface SelectedSongProps {
  song: Song;
}

function SelectedSong({ song }: SelectedSongProps) {
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
      <Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
          }}
        >
          {song.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {song.artist}
        </Typography>
      </Box>

      <IconButton size="small" aria-label={`Remove ${song.title}`}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
