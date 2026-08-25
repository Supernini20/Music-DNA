import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export function SongMeaning() {
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
        <FavoriteBorderIcon color="primary" />

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          What do these songs mean to you?
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Music can mean different things to different people. Tell us a little
        about your connection to each song.
      </Typography>

      <SongMeaningItem
        title="Everything In Its Right Place"
        artist="Radiohead"
      />

      <SongMeaningItem title="Midnight City" artist="M83" />
    </Card>
  );
}

interface SongMeaningItemProps {
  title: string;
  artist: string;
}

function SongMeaningItem({ title, artist }: SongMeaningItemProps) {
  return (
    <Box
      sx={{
        mb: 4,
        "&:last-child": {
          mb: 0,
        },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {artist}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "220px 1fr",
          },
          gap: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Meaning</InputLabel>

          <Select defaultValue="describes-me" label="Meaning">
            <MenuItem value="describes-me">Describes me</MenuItem>

            <MenuItem value="frequently-listen">I listen to it often</MenuItem>

            <MenuItem value="emotional">Emotionally important</MenuItem>

            <MenuItem value="memory">Reminds me of something</MenuItem>

            <MenuItem value="other-side">Shows another side of me</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Optional association"
          placeholder="What does this song make you think of?"
          multiline
          minRows={2}
        />
      </Box>
    </Box>
  );
}
