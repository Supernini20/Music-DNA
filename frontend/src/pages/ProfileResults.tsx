import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileSummary } from "../components/profile/ProfileSummary";
import { GeneratedImage } from "../components/profile/GeneratedImage";
import { GeneratedSound } from "../components/profile/GeneratedSound";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Link, useParams } from "react-router-dom";
import { getMusicProfile } from "../api/api";
import { API_URL } from "../api/client";
import type { MusicProfile } from "../types";

export function ProfileResults() {
  const { testId } = useParams<{ testId: string }>();
  const [profile, setProfile] = useState<MusicProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!testId) return;
    getMusicProfile(testId)
      .then(setProfile)
      .catch(() => setError("This profile could not be loaded."));
  }, [testId]);

  if (error) return <Typography sx={{ p: 4 }}>{error}</Typography>;
  if (!profile) return <CircularProgress sx={{ display: "block", m: 8 }} />;

  const imageUrl = profile.imageUrl
    ? new URL(profile.imageUrl, API_URL).toString()
    : undefined;
  const audioUrl = profile.audioUrl
    ? new URL(profile.audioUrl, API_URL).toString()
    : undefined;

  return (
    <Box className="profile-results">
      <Container maxWidth="md">
        <ProfileHeader />
        <ProfileSummary personality={profile.personality} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Test ID: {profile.testId}
        </Typography>
        <GeneratedSound audioUrl={audioUrl} />
        <GeneratedImage imageUrl={imageUrl} />
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
            endIcon={<RestartAltIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
            component={Link}
            to="/test"
          >
            Restart Test
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
