import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
  LinearProgress,
  Card,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const file = 
  {
    name: "2-PhatBieuBaiToan.pdf",
    topics: [
      "Comparing SIS Platforms",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
    ],
    progress: 40,
  };
const questions = [
  {
    question: "What is React?",
    options: ["Library", "Framework", "Language", "Tool"],
    answer: "Library",
    explanation: "React is a JavaScript library for building user interfaces.",
  },
  {
    question: "What is JavaScript?",
    options: ["Language", "Framework", "Library", "Tool"],
    answer: "Language",
    explanation:
      "JavaScript is a programming language used for web development.",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Code Style Syntax",
    ],
    answer: "Cascading Style Sheets",
    explanation:
      "CSS (Cascading Style Sheets) is used to describe the presentation of a document written in HTML.",
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A way to close a program",
      "A function with access to its outer function's scope",
      "A method to encrypt code",
      "A type of loop",
    ],
    answer: "A function with access to its outer function's scope",
    explanation:
      "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.",
  },
  {
    question: "Which of these is NOT a primitive data type in JavaScript?",
    options: ["Number", "String", "Boolean", "Object"],
    answer: "Object",
    explanation:
      "In JavaScript, Number, String, and Boolean are primitive data types. Object is a complex data type.",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
    explanation:
      "HTML (Hyper Text Markup Language) is the standard markup language for creating web pages.",
  },
  {
    question: "What is the purpose of the 'useState' hook in React?",
    options: [
      "To fetch data",
      "To manage state in functional components",
      "To create components",
      "To handle routing",
    ],
    answer: "To manage state in functional components",
    explanation:
      "useState is a React hook that allows functional components to have and update state without writing a class component.",
  },
  {
    question: "What is Node.js?",
    options: [
      "A frontend framework",
      "A backend runtime environment",
      "A database system",
      "A programming language",
    ],
    answer: "A backend runtime environment",
    explanation:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, allowing JavaScript to be used on the server-side.",
  },
  {
    question: "What does API stand for?",
    options: [
      "Advanced Programming Interface",
      "Application Programming Interface",
      "Automated Program Interaction",
      "Advanced Program Integration",
    ],
    answer: "Application Programming Interface",
    explanation:
      "An API (Application Programming Interface) is a set of rules and protocols for building and interacting with software applications.",
  },
  {
    question: "What is TypeScript?",
    options: [
      "A version of JavaScript",
      "A superset of JavaScript with type checking",
      "A separate programming language",
      "A JavaScript framework",
    ],
    answer: "A superset of JavaScript with type checking",
    explanation:
      "TypeScript is a programming language developed by Microsoft that adds static typing to JavaScript, helping catch errors early in development.",
  },
  {
    question: "What is the virtual DOM in React?",
    options: [
      "A real copy of the DOM",
      "An in-memory representation of the real DOM",
      "A database for DOM elements",
      "A backend service",
    ],
    answer: "An in-memory representation of the real DOM",
    explanation:
      "The virtual DOM is a lightweight copy of the real DOM that React uses to optimize updates and rendering.",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Twitter"],
    answer: "Facebook",
    explanation: "React was developed by Facebook and released in 2013.",
  },
  {
    question: "What is JSX?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JavaScript eXtension",
      "JavaScript Execution",
    ],
    answer: "JavaScript XML",
    explanation:
      "JSX stands for JavaScript XML and allows writing HTML-like syntax within JavaScript for React.",
  },
  {
    question: "What is the main purpose of props in React?",
    options: [
      "To manage state",
      "To pass data between components",
      "To handle API requests",
      "To style components",
    ],
    answer: "To pass data between components",
    explanation:
      "Props (properties) are used to pass data from parent components to child components in React.",
  },
  {
    question: "Which of the following is used to handle side effects in React?",
    options: ["useState", "useEffect", "useContext", "useRef"],
    answer: "useEffect",
    explanation:
      "The useEffect hook lets you perform side effects in functional components, such as fetching data or updating the DOM.",
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ul>",
    explanation:
      "The <ul> tag defines an unordered list, and each item is wrapped in an <li> tag.",
  },
  {
    question: "What does JSON stand for?",
    options: [
      "JavaScript Object Notation",
      "Java Source Object Notation",
      "JavaScript Online Notation",
      "Java Serialized Object Network",
    ],
    answer: "JavaScript Object Notation",
    explanation:
      "JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans and machines to read and write.",
  },
  {
    question: "Which of these is NOT a valid HTTP method?",
    options: ["GET", "POST", "SEND", "DELETE"],
    answer: "SEND",
    explanation:
      "SEND is not a valid HTTP method. Common HTTP methods include GET, POST, PUT, PATCH, and DELETE.",
  },
  {
    question: "What is the primary use of Git?",
    options: [
      "A programming language",
      "A database system",
      "Version control",
      "Web hosting",
    ],
    answer: "Version control",
    explanation:
      "Git is a distributed version control system used to track changes in source code during software development.",
  },
];

export default function QuizSection() {
  const [searchParams] = useSearchParams();
  const history = searchParams.get("historyItem");
  const [currentQuestion, setCurrentQuestion] = useState(parseInt(searchParams.get("question"), 10) - 1 || 0);
const [answers, setAnswers] = useState({});
const [submitted, setSubmitted] = useState(false);

const moveToNextQuestion = () => {
  setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  setSubmitted(false);
};

const moveToPreviousQuestion = () => {
  setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  setSubmitted(false);
};

const handleAnswerSelect = (option) => {
  if (!submitted) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  }
};

const handleSubmit = () => {
  setSubmitted(true);
};

const currentQuestionData = questions[currentQuestion];
const selectedAnswer = answers[currentQuestion];
const isCorrect = selectedAnswer === currentQuestionData.answer;

return history !== "overview" ? (
  <Box
    sx={{
      margin: "auto",
      textAlign: "center",
      p: 3,
      position: "relative",
    }}
  >
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={((currentQuestion + 1) / questions.length) * 100}
        size={80}
        
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
        </Typography>
      </Box>
    </Box>

    <Stack direction="row" spacing={2} sx={{ alignItems: "center", width: "100%" }}>
      {/* Previous Button */}
      <IconButton
        onClick={moveToPreviousQuestion}
        disabled={currentQuestion === 0}
        sx={{ fontSize: 24 }}
      >
        <ChevronLeftIcon fontSize="large" />
      </IconButton>

      {/* Question Title */}
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
        Question {currentQuestion + 1} / {questions.length}
      </Typography>

      {/* Next Button */}
      <IconButton
        onClick={moveToNextQuestion}
        disabled={currentQuestion === questions.length - 1}
        sx={{ fontSize: 24 }}
      >
        <ChevronRightIcon fontSize="large" />
      </IconButton>
    </Stack>

    <Box sx={{ border: "3px solid gray", borderRadius: 2, p: 3, mb: 3 }}>
      {/* Question Text */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        {currentQuestionData.question}
      </Typography>

      {/* Answer Options (Two-Column Layout) */}
      <Grid container spacing={2}>
        {currentQuestionData.options.map((option, index) => (
          <Grid item xs={6} key={index}>
            <Paper
              onClick={() => {handleAnswerSelect(option); handleSubmit();}}
              sx={{
                p: 2,
                textAlign: "center",
                cursor: submitted ? "default" : "pointer",
                backgroundColor: submitted
                  ? option === currentQuestionData.answer
                    ? "green"
                    : selectedAnswer === option
                    ? "red"
                    : "gray.100"
                  : selectedAnswer === option
                  ? "lightgray"
                  : "gray.100",
                color: "black",
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: submitted
                    ? option === currentQuestionData.answer
                      ? "green"
                      : selectedAnswer === option
                      ? "red"
                      : "gray.200"
                    : "black.300",
                },
              }}
            >
              {option}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>

    {/* Feedback Section */}
    {submitted && (
      <Box
        sx={{
          bgcolor: isCorrect ? "#e6f3e6" : "#f3e6e6",
          p: 2,
          borderRadius: 2,
          mt: 2,
        }}
      >
        {isCorrect ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
        <Typography sx={{ color: isCorrect ? "green" : "red", mt: 1 }}>
          {currentQuestionData.explanation}
        </Typography>
      </Box>
    )}
  </Box>
  ) : (
    <Box sx={{ margin: "auto", textAlign: "center", p: 3, display: "flex", justifyContent: "center" }}>
    <Card
    sx={{
      textAlign: "center",
      p: 3,
      maxWidth: "500px",
      borderRadius: 3,
      border: "1px solid lightgray",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    }}
  >
    <QuizIcon color="success" sx={{ fontSize: 50 }} />
    <Typography variant="h6" fontWeight={600} color="success.main" mt={1}>
      Study Set
    </Typography>
    <Typography variant="h4" fontWeight={700}>
      quiz 1
    </Typography>
    <Typography variant="body1" mt={1}>
      This study set contains <b>19 questions</b> that were generated
      from the <b>following file:</b>
    </Typography>
    <Box
      sx={{
        display: "inline-block",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        p: 1.5,
        border: "1px solid lightgray",
        borderRadius: 2,
        backgroundColor: "#f8f8f8",
      }}
    >
      <Typography variant="body2" fontWeight={600}>
        📄 {file.name || "paper IUKM2025.pdf"}
      </Typography>
    </Box>
    <Typography variant="body2" color="text.secondary" mt={2}>
      You have already answered <b>4 / 19</b> questions.
    </Typography>
    <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}>
  <LinearProgress
    variant="determinate"
    value={21}
    sx={{
      width: "70%",
      height: 6,
      borderRadius: 3,
      backgroundColor: "#e0e0e0",
    }}
  />
  <Typography variant="body2" color="text.secondary">
    21%
  </Typography>
</Stack>

    <Typography variant="h6" color="success.main" mt={2}>
      Are you ready to continue?
    </Typography>
    <Button variant="contained" color="success" sx={{ mt: 2, px: 4 }} onClick={() => window.location.href = "/learning/course?section=quizzes&historyItem=quiz1&question=4"}>
      Continue Studying
    </Button>
  </Card>
  </Box>
  );
}
