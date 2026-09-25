import { Box, Card, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

type ProfileSummaryProps = {
  personality?: Record<string, number>;
};

export function ProfileSummary({ personality = {} }: ProfileSummaryProps) {
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
          mb: 3,
        }}
      >
        <MusicNoteIcon color="primary" />

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          Your musical profile
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: "action.hover",
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            Emotion
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 0.5,
              fontWeight: 600,
            }}
          >
            {personality.E ?? "-"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Your music leans toward emotional expression.
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: "action.hover",
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            Energy
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 0.5,
              fontWeight: 600,
            }}
          >
            {personality.V ?? "-"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            You move between calm and energetic sounds.
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: "action.hover",
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            Complexity
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 0.5,
              fontWeight: 600,
            }}
          >
            {personality.O ?? "-"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            You seem to enjoy layered and detailed music.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
