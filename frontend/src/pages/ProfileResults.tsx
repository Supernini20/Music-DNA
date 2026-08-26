import { Box, Container } from "@mui/material";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileSummary } from "../components/profile/ProfileSummary";
import { GeneratedImage } from "../components/profile/GeneratedImage";
import { GeneratedSound } from "../components/profile/GeneratedSound";
import { JourneyNavigation } from "../components/JourneyNavigation";

export function ProfileResults() {
  return (
    <Box className="profile-results">
      <Container maxWidth="md">
        <ProfileHeader />
        <ProfileSummary />
        <GeneratedSound />
        <GeneratedImage />
        <JourneyNavigation currentStep="profile" />
      </Container>
    </Box>
  );
}
