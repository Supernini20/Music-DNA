import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

type JourneyStep = "home" | "test" | "profile";

interface JourneyNavigationProps {
  currentStep: JourneyStep;
}

interface StepInfo {
  label: string;
  path: string;
}

const steps: Record<JourneyStep, StepInfo> = {
  home: {
    label: "Home",
    path: "/",
  },
  test: {
    label: "Your Test",
    path: "/test",
  },
  profile: {
    label: "Your Profile",
    path: "/profile",
  },
};

export function JourneyNavigation({ currentStep }: JourneyNavigationProps) {
  const stepOrder: JourneyStep[] = ["home", "test", "profile"];
  const currentIndex = stepOrder.indexOf(currentStep);

  const previousStep = currentIndex > 0 ? stepOrder[currentIndex - 1] : null;

  const nextStep =
    currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : null;

  return (
    <Box
      component="nav"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        mt: 6,
        py: 3,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {previousStep ? (
            <Button
              component={Link}
              to={steps[previousStep].path}
              startIcon={<ArrowBackIcon />}
              sx={{
                textTransform: "none",
                textAlign: "left",
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  Previous
                </Typography>

                <Typography variant="body2">
                  {steps[previousStep].label}
                </Typography>
              </Box>
            </Button>
          ) : (
            <Box sx={{ width: 100 }} />
          )}

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
              gap: 1,
            }}
          >
            {stepOrder.map((step, index) => {
              const isCurrent = step === currentStep;
              const isCompleted = index < currentIndex;

              return (
                <Box
                  key={step}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: isCurrent ? 10 : 7,
                      height: isCurrent ? 10 : 7,
                      borderRadius: "50%",
                      backgroundColor:
                        isCurrent || isCompleted ? "primary.main" : "divider",
                    }}
                  />

                  {index < stepOrder.length - 1 && (
                    <Box
                      sx={{
                        width: 24,
                        height: 1,
                        mx: 0.5,
                        backgroundColor:
                          index < currentIndex ? "primary.main" : "divider",
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>

          {nextStep ? (
            <Button
              component={Link}
              to={steps[nextStep].path}
              endIcon={<ArrowForwardIcon />}
              sx={{
                textTransform: "none",
                textAlign: "right",
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  Next
                </Typography>

                <Typography variant="body2">{steps[nextStep].label}</Typography>
              </Box>
            </Button>
          ) : (
            <Box sx={{ width: 100 }} />
          )}
        </Box>
      </Container>
    </Box>
  );
}
