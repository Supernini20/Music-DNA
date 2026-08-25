import { Box, Button, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { PersonalityQuestions } from "../components/profile-test/PersonalityQuestions";
import { SongSelection } from "../components/profile-test/SongSelection";
import { SongMeaning } from "../components/profile-test/SongMeaning";
import { JourneyNavigation } from "../components/JourneyNavigation";

export function ProfileTest() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
          >
            MUSIC PERSONALITY TEST
          </Typography>

          <Typography
            variant="h2"
            sx={{
              mt: 1,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Get to know your musical self
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: "auto",
              mt: 2,
            }}
          >
            Tell us a little about yourself and choose the songs that feel
            meaningful to you.
          </Typography>
        </Box>

        <PersonalityQuestions />

        <SongSelection />

        <SongMeaning />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            mb: 4,
          }}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Finish test
          </Button>
        </Box>
        <JourneyNavigation currentStep="test" />
      </Container>
    </Box>
  );
}
