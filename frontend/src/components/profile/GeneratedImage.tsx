import { Box, Card, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export function GeneratedImage() {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
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
        <AutoAwesomeIcon color="primary" />

        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Your visual personality
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: 360,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          background: "linear-gradient(145deg, #e8e3ff 0%, #dceeff 100%)",
        }}
      >
        <AutoAwesomeIcon
          sx={{
            fontSize: 48,
            color: "primary.main",
            mb: 2,
          }}
        />

        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Your generated image
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxWidth: 360,
            mt: 1,
          }}
        >
          A visual interpretation of your musical personality.
        </Typography>
      </Box>
    </Card>
  );
}
