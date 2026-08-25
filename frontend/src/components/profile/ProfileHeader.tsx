import { Box, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export function ProfileHeader() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
      }}
    >
      <AutoAwesomeIcon
        sx={{
          fontSize: 32,
          color: "primary.main",
          mb: 1,
        }}
      />

      <Typography
        variant="overline"
        sx={{
          display: "block",
          color: "primary.main",
          fontWeight: 700,
          letterSpacing: "0.15em",
        }}
      >
        YOUR MUSICAL PERSONALITY
      </Typography>

      <Typography
        variant="h2"
        sx={{
          mt: 1,
          fontWeight: 700,
          letterSpacing: "-0.03em",
        }}
      >
        "Label"
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 560,
          mx: "auto",
          mt: 2,
        }}
      >
        "Your descirption here"
      </Typography>
    </Box>
  );
}
