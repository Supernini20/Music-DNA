import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProfileHeader } from "../components/profile/ProfileHeader";
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
    let cancelled = false;
    let timeoutId: number | undefined;

    const loadProfile = async () => {
      try {
        const nextProfile = await getMusicProfile(testId);
        if (cancelled) return;

        setProfile(nextProfile);
        const imagePending =
          !nextProfile.imageUrl && nextProfile.imageStatus !== "failed";
        const audioPending =
          !nextProfile.audioUrl && nextProfile.audioStatus !== "failed";
        if (imagePending || audioPending) {
          timeoutId = window.setTimeout(loadProfile, 3000);
        }
      } catch {
        if (!cancelled) setError("This profile could not be loaded.");
      }
    };

    void loadProfile();
    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
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
        <GeneratedSound audioUrl={audioUrl} status={profile.audioStatus} />
        <GeneratedImage imageUrl={imageUrl} status={profile.imageStatus} />
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
