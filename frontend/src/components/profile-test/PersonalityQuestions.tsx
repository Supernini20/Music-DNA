import { useState } from "react";
import { Box, Button, Card, LinearProgress, Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";

import { QuestionCard } from "./QuestionCard";
import questions from "../../data/questions.json";

export type Answer = 1 | 2 | 3 | 4 | 5;

type PersonalityQuestionsProps = {
  onComplete?: (answers: Record<number, Answer>) => void;
};

export function PersonalityQuestions({
  onComplete,
}: PersonalityQuestionsProps) {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const question = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: Answer) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestion]: value,
    }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    if (isLastQuestion) {
      onComplete?.(answers);
      return;
    }

    setCurrentQuestion((current) => current + 1);
  };

  const handleBack = () => {
    if (isFirstQuestion) return;

    setCurrentQuestion((current) => current - 1);
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
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
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

      {/* Progress */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestion + 1} of {questions.length}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
          }}
        />
      </Box>

      {/* Current question */}
      <QuestionCard
        key={currentQuestion}
        question={question}
        index={currentQuestion}
        answer={currentAnswer}
        onAnswer={handleAnswer}
      />

      {/* Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={isFirstQuestion}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!currentAnswer}
        >
          {isLastQuestion ? "Continue" : "Next"}
        </Button>
      </Box>
    </Card>
  );
}
