import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TitleIcon from "@mui/icons-material/Title";

import { PersonalityQuestions } from "../components/profile-test/PersonalityQuestions";
import { SongSelection } from "../components/profile-test/SongSelection";
import { SongRating } from "../components/profile-test/SongRating";
import { createMusicProfile } from "../api/api";

import type { MusicProfileRequest } from "../types";
import { useNavigate } from "react-router-dom";
import type { Answer } from "../components/profile-test/PersonalityQuestions";
import type { Song } from "../components/profile-test/SongSelection";
import type { SongRatingValue } from "../components/profile-test/SongRating";
import questions from "../data/questions.json";

export function ProfileTest() {
  const navigate = useNavigate();
  const [personalityAnswers, setPersonalityAnswers] = useState<
    Record<number, Answer>
  >({});
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [ratedSongs, setRatedSongs] = useState<SongRatingValue[]>([]);
  const [identifiesWith, setIdentifiesWith] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isTestComplete =
    Object.keys(personalityAnswers).length === questions.length &&
    favoriteSongs.length === 3 &&
    identifiesWith.trim().length > 0 &&
    ratedSongs.length === 3;

  const handleFinishTest = async () => {
    const request: MusicProfileRequest = {
      testId: crypto.randomUUID(),
      personality: {
        answers: questions.map((question, index) => ({
          dimension: question.dimension as "E" | "V" | "G" | "N" | "O",
          polung: question.polung as "+" | "-",
          answer: personalityAnswers[index],
        })),
      },
      music: {
        favoriteSongs: favoriteSongs.map((song) => song.id),
        identifiesWith: identifiesWith.trim(),
        ratedSongs,
      },
    };

    setIsSubmitting(true);
    try {
      await createMusicProfile(request);
      navigate(`/profile/${request.testId}`);
    } finally {
      setIsSubmitting(false);
    }
  };
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
            What is your Music DNA?{" "}
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
            meaningful to &nbsp;
            <Typography variant="span" sx={{ color: "primary.main" }}>
              <b>YOU</b>
            </Typography>
            .
          </Typography>
        </Box>

        <PersonalityQuestions
          onComplete={(personalityAnswers) => {
            setPersonalityAnswers(personalityAnswers);
          }}
        />

        <SongSelection onChange={setFavoriteSongs} />
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
            <TitleIcon color="primary" />

            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Music title you identify with
            </Typography>
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="A song that describes you"
              value={identifiesWith}
              onChange={(event) => setIdentifiesWith(event.target.value)}
              placeholder="Enter a song title"
              helperText="Name a song title you identify with."
            />
          </Box>
        </Card>

        <SongRating onChange={setRatedSongs} />

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
            onClick={handleFinishTest}
            disabled={isSubmitting || !isTestComplete}
          >
            {isSubmitting ? "Saving..." : "Finish test"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
