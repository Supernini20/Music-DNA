import { Box, Card, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageIcon from "@mui/icons-material/Image";

type GeneratedImageProps = {
  imageUrl?: string;
  status?: "pending" | "ready" | "failed";
};

export function GeneratedImage({ imageUrl, status }: GeneratedImageProps) {
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
        <ImageIcon color="primary" />

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
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt="Visual interpretation of your musical personality"
            sx={{
              display: "block",
              width: "100%",
              maxWidth: 640,
              maxHeight: 520,
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        ) : (
          <>
            <AddPhotoAlternateIcon
              sx={{
                fontSize: 48,
                color: "primary.main",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {status === "failed"
                ? "Your generated image could not be created"
                : "Your generated image is not available yet"}
            </Typography>
          </>
        )}

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
