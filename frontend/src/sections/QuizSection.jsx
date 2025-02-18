import { useState } from "react";
import { Box, Button, Typography, Grid, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const questions = [
    { question: "What is React?", options: ["Library", "Framework", "Language", "Tool"], answer: "Library" },
    { question: "What is JavaScript?", options: ["Language", "Framework", "Library", "Tool"], answer: "Language" },
    { question: "What is JSX?", options: ["JavaScript", "Syntax", "Library", "Framework"], answer: "Syntax" },
    { question: "What is useState?", options: ["Hook", "Component", "Library", "Function"], answer: "Hook" },
    { question: "What is Babel?", options: ["Compiler", "Framework", "Language", "Library"], answer: "Compiler" },
    { question: "What is React?", options: ["Library", "Framework", "Language", "Tool"], answer: "Library" },
    { question: "What is JavaScript?", options: ["Language", "Framework", "Library", "Tool"], answer: "Language" },
    { question: "What is JSX?", options: ["JavaScript", "Syntax", "Library", "Framework"], answer: "Syntax" },
    { question: "What is useState?", options: ["Hook", "Component", "Library", "Function"], answer: "Hook" },
    { question: "What is Babel?", options: ["Compiler", "Framework", "Language", "Library"], answer: "Compiler" },
    { question: "What is React?", options: ["Library", "Framework", "Language", "Tool"], answer: "Library" },
    { question: "What is JavaScript?", options: ["Language", "Framework", "Library", "Tool"], answer: "Language" },
    { question: "What is JSX?", options: ["JavaScript", "Syntax", "Library", "Framework"], answer: "Syntax" },
    { question: "What is useState?", options: ["Hook", "Component", "Library", "Function"], answer: "Hook" },
    { question: "What is Babel?", options: ["Compiler", "Framework", "Language", "Library"], answer: "Compiler" },
    { question: "What is React?", options: ["Library", "Framework", "Language", "Tool"], answer: "Library" },
    { question: "What is JavaScript?", options: ["Language", "Framework", "Library", "Tool"], answer: "Language" },
    { question: "What is JSX?", options: ["JavaScript", "Syntax", "Library", "Framework"], answer: "Syntax" },
    { question: "What is useState?", options: ["Hook", "Component", "Library", "Function"], answer: "Hook" },
    { question: "What is Babel?", options: ["Compiler", "Framework", "Language", "Library"], answer: "Compiler" },
    { question: "What is React?", options: ["Library", "Framework", "Language", "Tool"], answer: "Library" },
    { question: "What is JavaScript?", options: ["Language", "Framework", "Library", "Tool"], answer: "Language" },
    { question: "What is JSX?", options: ["JavaScript", "Syntax", "Library", "Framework"], answer: "Syntax" },
    { question: "What is useState?", options: ["Hook", "Component", "Library", "Function"], answer: "Hook" },
    { question: "What is Babel?", options: ["Compiler", "Framework", "Language", "Library"], answer: "Compiler" },
  ];
  
  export default function QuizSection() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [submitted, setSubmitted] = useState(false);
  
    const handleSelect = (index) => setCurrentQuestion(index);
    const handleChange = (event) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = event.target.value;
      setAnswers(newAnswers);
    };
    const handleSubmit = () => setSubmitted(true);
    const getColor = (index) => {
      if (submitted) return answers[index] === questions[index].answer ? "green" : "red";
      if (currentQuestion === index)
        return "white";
      return "#ddd";
    };
    const getOptionColor = (option, index) => {
      if (!submitted) return "inherit";
      if (answers[index] === option && option !== questions[index].answer) return "red";
      if (option === questions[index].answer) return "green";
      return "inherit";
    };
  
    return (
      <Box sx={{ p: 4, backgroundColor: "#fce4ec", borderRadius: 2 }}>
        <Typography variant="h6" textAlign="center">Quizzes</Typography>
        <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          {questions.map((_, index) => (
            <Grid item key={index}>
              <Button
                variant="contained"
                sx={{ backgroundColor: getColor(index) }}
                onClick={() => handleSelect(index)}
              >
                {index + 1}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" sx={{ mb: 2 }}>{questions[currentQuestion].question}</Typography>
        <RadioGroup value={answers[currentQuestion] || ""} onChange={handleChange} >
          {questions[currentQuestion].options.map((option, i) => (
            <FormControlLabel
              key={i}
              value={option}
              control={<Radio sx={{ color: getOptionColor(option, currentQuestion) }} />}
              label={<span style={{ color: getOptionColor(option, currentQuestion) }}>{option}</span>}
              disabled={submitted}
            />
          ))}
        </RadioGroup>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitted}>
            Submit
          </Button>
          <Button onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))} disabled={currentQuestion === questions.length - 1}>
            Next
          </Button>
        </Box>
      </Box>
    );
  }