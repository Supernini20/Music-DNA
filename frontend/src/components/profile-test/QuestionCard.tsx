import { Card, CardContent, Typography, Box, Slider } from "@mui/material";
import type { Answer } from "./PersonalityQuestions";
interface Question {
  de: string;
  en: string;
  dimension: string;
  polung: string;
  facette: string;
}

interface QuestionCardProps {
  question: Question;
  index: number;
  answer: Answer;
  onAnswer: (value: Answer) => void;
}
export function QuestionCard({
  question,
  index,
  answer,
  onAnswer,
}: QuestionCardProps) {
  const options = [
    "Strongly disagree",
    "Disagree",
    "Neither agree nor disagree",
    "Agree",
    "Strongly agree",
  ];

  const marks = options.map((label, index) => ({
    value: index + 1,
    label,
  }));

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          Frage {index + 1}
        </Typography>

        <Typography
          component="h2"
          sx={{
            mb: 7,
            color: "text.primary",
            fontSize: {
              xs: "1.3rem",
              md: "1.7rem",
            },
            fontWeight: 600,
            lineHeight: 1.4,
            textAlign: "center",
          }}
        >
          {question.en}
        </Typography>

        <Box
          sx={{
            px: { xs: 2, md: 4 },
            pb: 7,
          }}
        >
          <Slider
            value={answer ?? 3}
            min={1}
            max={5}
            step={1}
            marks={marks}
            onChange={(_, value) => onAnswer(value as Answer)}
            valueLabelDisplay="off"
            sx={{
              color: "grey.300",
              height: 6,

              /* Background */
              "& .MuiSlider-rail": {
                opacity: 1,
                backgroundColor: "grey.300",
              },

              "& .MuiSlider-track": {
                backgroundColor: "grey.300",
                border: "none",
              },

              "& .MuiSlider-thumb": {
                width: 28,
                height: 28,

                backgroundColor: "white",
                border: "4px solid",
                borderColor: "primary.main",

                boxShadow: 2,

                "&:hover": {
                  boxShadow: "0 0 0 8px rgba(25, 118, 210, 0.12)",
                },

                "&.Mui-focusVisible": {
                  boxShadow: "0 0 0 8px rgba(25, 118, 210, 0.12)",
                },
              },

              "& .MuiSlider-mark": {
                width: 12,
                height: 12,
                borderRadius: "50%",

                backgroundColor: "grey.400",
                opacity: 1,

                transform: "translate(-50%, -50%)",
              },

              "& .MuiSlider-markLabel": {
                top: 35,

                width: {
                  xs: 70,
                  sm: 120,
                  md: 160,
                },

                whiteSpace: "normal",
                textAlign: "center",

                fontSize: {
                  xs: "0.7rem",
                  sm: "0.8rem",
                  md: "0.875rem",
                },

                lineHeight: 1.3,

                color: "text.secondary",
              },

              /* Currrent Position */
              [`& .MuiSlider-mark[data-index="${answer - 1}"]`]: {
                backgroundColor: "primary.main",
              },

              [`& .MuiSlider-markLabel[data-index="${answer - 1}"]`]: {
                color: "primary.main",
                fontWeight: 600,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
