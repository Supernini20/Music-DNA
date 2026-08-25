import { Box, Card, IconButton, Typography } from "@mui/material";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export function GeneratedSound() {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 6,
        p: { xs: 3, sm: 4 },
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
        <GraphicEqIcon color="primary" />

        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Your personal sound
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          borderRadius: 3,
          backgroundColor: "action.hover",
        }}
      >
        <IconButton
          color="primary"
          sx={{
            width: 52,
            height: 52,
            backgroundColor: "background.paper",
            "&:hover": {
              backgroundColor: "background.paper",
            },
          }}
        >
          <PlayArrowIcon />
        </IconButton>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Your musical identity
          </Typography>

          <Typography variant="body2" color="text.secondary">
            A sound created from your profile
          </Typography>

          {/* Temporary waveform */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mt: 1.5,
              height: 24,
            }}
          >
            {[12, 20, 8, 18, 24, 14, 22, 10, 18, 7, 16, 12].map(
              (height, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 4,
                    height,
                    borderRadius: 2,
                    backgroundColor: "primary.main",
                    opacity: 0.6,
                  }}
                />
              ),
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
