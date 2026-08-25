import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";

export function PersonalityQuestions() {
  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        mb: 4,
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
          mb: 4,
        }}
      >
        <PsychologyIcon color="primary" />

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          A little about you
        </Typography>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          1. How much do you enjoy trying new things?
        </Typography>

        <FormControl>
          <RadioGroup defaultValue="sometimes">
            <FormControlLabel
              value="rarely"
              control={<Radio />}
              label="I usually prefer what I already know"
            />

            <FormControlLabel
              value="sometimes"
              control={<Radio />}
              label="It depends on the situation"
            />

            <FormControlLabel
              value="often"
              control={<Radio />}
              label="I love discovering new things"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            mb: 3,
          }}
        >
          2. How strongly do your emotions influence your decisions?
        </Typography>

        <Slider
          defaultValue={50}
          valueLabelDisplay="auto"
          marks={[
            { value: 0, label: "Not much" },
            { value: 50, label: "Sometimes" },
            { value: 100, label: "Very strongly" },
          ]}
        />
      </Box>

      <Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          3. Which description feels most like you?
        </Typography>

        <FormControl>
          <RadioGroup defaultValue="reflective">
            <FormControlLabel
              value="social"
              control={<Radio />}
              label="Curious and social"
            />

            <FormControlLabel
              value="reflective"
              control={<Radio />}
              label="Thoughtful and reflective"
            />

            <FormControlLabel
              value="adventurous"
              control={<Radio />}
              label="Adventurous and spontaneous"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Card>
  );
}
