import { Box, Button, Container } from "@mui/material";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileSummary } from "../components/profile/ProfileSummary";
import { GeneratedImage } from "../components/profile/GeneratedImage";
import { GeneratedSound } from "../components/profile/GeneratedSound";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Link } from "react-router-dom";

export function ProfileResults() {
  return (
    <Box className="profile-results">
      <Container maxWidth="md">
        <ProfileHeader />
        <ProfileSummary />
        <GeneratedSound />
        <GeneratedImage />
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
