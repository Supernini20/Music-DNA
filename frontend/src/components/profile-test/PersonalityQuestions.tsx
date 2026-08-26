import { Box, Card, Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { QuestionCard } from "./QuestionCard";
import questions from "../../data/questions.json";
import { useState } from "react";

export type Answer = 1 | 2 | 3 | 4 | 5;

export function PersonalityQuestions() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const handleAnswer = (questionIndex: number, value: Answer) => {
    setAnswers((current) => ({
      ...current,
      [questionIndex]: value,
    }));
  };

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

      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          index={index}
          answer={answers[index]}
          onAnswer={(value: Answer) => handleAnswer(index, value)}
        />
      ))}
    </Card>
  );
}
