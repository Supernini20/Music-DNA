import { Box, Card, Typography } from "@mui/material";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

type GeneratedSoundProps = {
  audioUrl?: string;
  status?: "pending" | "ready" | "failed";
};

export function GeneratedSound({ audioUrl, status }: GeneratedSoundProps) {
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
          display: "flex-column",
          alignItems: "center",
          gap: 2,
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(145deg, #e8e3ff 0%, #dceeff 100%)",
        }}
      >
        {audioUrl ? (
          <Box
            component="audio"
            controls
            src={audioUrl}
            aria-label="Play your generated musical identity"
            sx={{
              width: "100%",
              maxWidth: 420,
            }}
          />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                    }}
                  />
                ),
              )}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {status === "failed"
                ? "Your generated sound could not be created"
                : "Your generated sound is not available yet"}
            </Typography>
          </>
        )}

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            A sound created from your profile
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
