import { Box, Button, Card, Container, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            py: 8,
            textAlign: "center",
          }}
        >
          {/* Introduction */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.03em",
                mb: 2,
              }}
            >
              Discover your
              <br />
              musical personality
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 400,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Your music says something about &nbsp;
              <Typography variant="span" sx={{ color: "primary.main" }}>
                <b>YOU</b>
              </Typography>
              . Discover your personal music profile through your preferences,
              memories, and associations.
            </Typography>
          </Box>

          {/* Unknown music profile */}
          <Card
            elevation={0}
            sx={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              mx: "auto",
              mb: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "visible",
              background: "linear-gradient(145deg, #e8e3ff 0%, #dceeff 100%)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 20px 50px rgba(80, 70, 140, 0.12)",
            }}
          >
            {/* Decorative music notes */}
            <MusicNoteIcon
              sx={{
                position: "absolute",
                top: 40,
                left: 25,
                fontSize: 40,
                opacity: 0.45,
                animation: "floatNote 2.2s ease-in-out infinite",
                "@keyframes floatNote": {
                  "0%, 100%": { transform: "translateY(0) rotate(-15deg)" },
                  "50%": { transform: "translateY(-18px) rotate(-15deg)" },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                },
              }}
            />

            <MusicNoteIcon
              sx={{
                position: "absolute",
                bottom: 30,
                right: 25,
                fontSize: 50,
                opacity: 0.35,
                animation: "floatNote 2.6s ease-in-out infinite",
                animationDelay: "-1.2s",
                "@keyframes floatNote": {
                  "0%, 100%": { transform: "translateY(0) rotate(15deg)" },
                  "50%": { transform: "translateY(18px) rotate(15deg)" },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                },
              }}
            />

            {/* Unknown profile indicator */}
            <Typography
              sx={{
                fontSize: "7rem",
                fontWeight: 700,
                lineHeight: 1,
                color: "primary.main",
              }}
            >
              ?
            </Typography>
          </Card>

          {/* Call to action */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Your music profile is waiting...
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 500,
                mx: "auto",
                mb: 3,
              }}
            >
              Answer a few questions and choose songs that mean something to
              &nbsp;
              <Typography variant="span" sx={{ color: "primary.main" }}>
                <b>YOU</b>
              </Typography>
              . We will use them to generate a visual and acoustic
              representation of &nbsp;
              <Typography variant="span" sx={{ color: "primary.main" }}>
                <b>YOOU</b>
              </Typography>
              .
            </Typography>

            <Button
              variant="contained"
              component={Link}
              to="/test"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontSize: "1.05rem",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Start the test
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
