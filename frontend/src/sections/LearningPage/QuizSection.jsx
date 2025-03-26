import { useState, useEffect } from "react";
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
  TextField,
  Divider,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { WarningAmber } from "@mui/icons-material";
const ConfirmDialog = ({ open, onClose, onConfirm, title, content }) => (
  <Dialog
  open={open}
  onClose={onClose}
  sx={{
    "& .MuiDialog-paper": { borderRadius: 4, padding: 2, minWidth: 350 }
  }}
>
  <Box display="flex" alignItems="center" gap={1} px={2} pt={2}>
    <WarningAmber sx={{ fontSize: 30, color: "warning.main" }} />
    <DialogTitle sx={{ padding: 0, fontWeight: 600 }}>{title}</DialogTitle>
  </Box>
  <DialogContent>
    <Typography variant="body1" color="text.secondary">{content}</Typography>
  </DialogContent>
  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button onClick={onClose} variant="outlined" color="primary">
      Cancel
    </Button>
    <Button onClick={onConfirm} variant="contained" color="error">
      Confirm
    </Button>
  </DialogActions>
</Dialog>
);
const file = {
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
    question: "Which model is used for Optical Character Recognition (OCR)?",
    options: ["CLIP", "GPT-4o", "PaddleOCR", "Whisper"],
    answer: "PaddleOCR",
    explanation:
      "PaddleOCR is a specialized AI model designed specifically for Optical Character Recognition (OCR) tasks. Unlike other AI models that have broader applications, PaddleOCR focuses on accurately extracting and recognizing text from various image sources, including documents, screenshots, and photographs. Its advanced algorithms can handle multiple languages, different font styles, and complex background conditions, making it a powerful tool for text extraction in diverse scenarios.",
  },
  {
    question: "What is the primary function of the CLIP model in AI?",
    options: [
      "Convert voice to text",
      "Generate embeddings for text and images",
      "Extract textual content from images",
      "Enhance image resolution",
    ],
    answer: "Generate embeddings for text and images",
    explanation:
      "CLIP (Contrastive Language-Image Pre-training) is a groundbreaking multimodal AI model developed by OpenAI that generates embeddings for both text and images. By creating a shared vector space, CLIP can understand and relate textual and visual information, enabling complex tasks like zero-shot image classification, visual search, and cross-modal understanding. This approach allows the model to create meaningful representations that capture the semantic relationships between text and images, bridging the gap between different types of data.",
  },
  {
    question:
      "Which AI model is mainly used for Optical Character Recognition (OCR)?",
    options: ["GPT-4o", "Whisper", "PaddleOCR", "DALL-E"],
    answer: "PaddleOCR",
    explanation:
      "PaddleOCR stands out as the premier AI model for Optical Character Recognition. Developed by Baidu, this open-source tool excels at extracting text from images with high accuracy across multiple languages. Unlike general-purpose AI models, PaddleOCR is engineered specifically to detect, recognize, and convert text within images, supporting various scenarios from scanned documents to complex visual environments with challenging backgrounds and diverse text orientations.",
  },
  {
    question: "What is the role of Whisper in AI applications?",
    options: [
      "Enhancing text-based search accuracy",
      "Converting spoken language into text",
      "Generating AI-based images",
      "Detecting objects in videos",
    ],
    answer: "Converting spoken language into text",
    explanation:
      "Whisper, developed by OpenAI, is an advanced Automatic Speech Recognition (ASR) model designed to transcribe spoken language into written text with remarkable accuracy. Unlike traditional speech-to-text systems, Whisper is trained on a diverse multilingual dataset, enabling it to handle various accents, background noise, and technical terminology. Its robust architecture allows for precise speech transcription across multiple languages, making it a versatile tool for applications ranging from accessibility services to real-time translation and voice assistants.",
  },
  {
    question:
      "Which technique improves query accuracy by understanding natural language intent?",
    options: [
      "Semantic Search",
      "Keyframe Extraction",
      "Image Captioning",
      "Data Augmentation",
    ],
    answer: "Semantic Search",
    explanation:
      "Semantic Search represents a sophisticated approach to information retrieval that goes beyond traditional keyword matching. By leveraging natural language processing and machine learning techniques, semantic search understands the contextual meaning, user intent, and underlying semantics of a query. This approach allows for more intelligent and nuanced search results, considering synonyms, related concepts, and the broader context of the search terms, thereby significantly improving the relevance and accuracy of information retrieval.",
  },
  {
    question: "CLIP is used to generate embeddings for both text and images.",
    options: ["True", "False"],
    answer: "True",
    explanation:
      "CLIP's unique architecture enables it to generate embeddings across text and image domains simultaneously. By training on a massive dataset of image-text pairs, CLIP learns to create vector representations that capture semantic similarities between textual descriptions and visual content. This cross-modal embedding capability allows for innovative applications like zero-shot image classification, visual search, and understanding the relationship between text and images without task-specific training.",
  },
  {
    question: "PaddleOCR is primarily used for converting speech to text.",
    options: ["True", "False"],
    answer: "False",
    explanation:
      "PaddleOCR is specifically designed for Optical Character Recognition (OCR), focusing on extracting and recognizing text from images. Its primary function is to detect and convert printed or handwritten text within visual content, unlike speech-to-text models like Whisper. PaddleOCR employs advanced computer vision and machine learning techniques to handle various text recognition challenges, such as different fonts, languages, and complex background conditions.",
  },
  {
    question:
      "Whisper is an AI model used for Automatic Speech Recognition (ASR).",
    options: ["True", "False"],
    answer: "True",
    explanation:
      "Whisper is a state-of-the-art Automatic Speech Recognition (ASR) model developed by OpenAI, specifically engineered to convert spoken language into accurate, written text. Trained on a diverse, multilingual dataset, Whisper demonstrates exceptional capabilities in transcribing speech across various contexts, including different accents, background noise, and specialized terminology. Its robust architecture makes it a powerful tool for applications requiring precise speech-to-text conversion.",
  },
  {
    question: "Semantic Search does not improve query accuracy in AI systems.",
    options: ["True", "False"],
    answer: "False",
    explanation:
      "Semantic Search is a crucial technique that significantly enhances query accuracy in AI systems. By employing advanced natural language processing and machine learning algorithms, semantic search goes beyond simple keyword matching to understand the deeper meaning, context, and intent behind user queries. This approach allows AI systems to deliver more relevant, contextually appropriate results by analyzing the semantic relationships between words, considering synonyms, and interpreting the broader conceptual framework of the search terms.",
  },
  {
    question:
      "DALL-E is primarily designed for image generation from textual prompts.",
    options: ["True", "False"],
    answer: "True",
    explanation:
      "DALL-E, developed by OpenAI, represents a groundbreaking AI model that generates unique, creative images from textual descriptions. By leveraging advanced generative AI techniques, DALL-E can interpret complex text prompts and create corresponding visual representations that capture the nuanced details and creative interpretations suggested by the input. This technology demonstrates the remarkable potential of AI in understanding and translating linguistic descriptions into visual content, opening new possibilities in creative design, illustration, and visual communication.",
  },
];

export default function QuizSection() {
  const [searchParams] = useSearchParams();
  const [numberQuiz, setNumberQuiz] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const history = searchParams.get("historyItem");
  const [currentQuestion, setCurrentQuestion] = useState(
    parseInt(searchParams.get("question"), 10) - 1 || 0
  );
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
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        moveToNextQuestion();
      } else if (event.key === "ArrowLeft") {
        moveToPreviousQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion]);
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
  if (history === "create-quiz") {
    return (
      <Box
        sx={{
          margin: "auto",
          textAlign: "center",
          p: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            textAlign: "left",
            p: 4,
            maxWidth: "900px",
            borderRadius: 3,
            border: "1px solid lightgray",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f8f8",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Quiz Payment
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Number of Quizzes"
                placeholder="How many Quizzes you want to create?"
                variant="outlined"
                value={numberQuiz}
                onChange={(e) => setNumberQuiz(e.target.value)}
                InputProps={{
                  sx: { borderRadius: 3 },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Level"
                variant="outlined"
                select
                defaultValue="easy"
                InputProps={{
                  sx: { borderRadius: 3 },
                }}
              >
                {["easy", "medium", "hard"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Related Knowledge"
                placeholder="Achieve knowledge from any aspect"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 3 },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quiz Type"
                placeholder="Multiple answers or Yes/No question"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 3 },
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={600}>
            Total
          </Typography>
          <Stack sx={{ width: "40%" }}>
            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Typography>{numberQuiz}x quiz</Typography>
              <Typography fontWeight={600}>
              400 <img src="/Partials/Ecoin.png" height={30} width={30} style={{ verticalAlign: "middle" }}/>
            </Typography>

            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Total</Typography>
              <Typography fontWeight={600}>
              400 <img src="/Partials/Ecoin.png" height={30} width={30} style={{ verticalAlign: "middle" }}/>
            </Typography>
            </Stack>
          </Stack>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
            onClick={() => setOpenDialog(true)}
          >
            Create
          </Button>
          <ConfirmDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              onConfirm={() => {
                console.log("Confirmed!");
                setOpenDialog(false);
              }}
              title="Confirm Payment"
              content="Are you sure you want to proceed with the payment? This action cannot be undone."
            />
        </Card>
      </Box>
    );
  }
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

      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", width: "100%" }}
      >
        {/* Previous Button */}
        <IconButton
          onClick={moveToPreviousQuestion}
          disabled={currentQuestion === 0}
          sx={{ fontSize: 24 }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        {/* Question Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
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
                onClick={() => {
                  handleAnswerSelect(option);
                  handleSubmit();
                }}
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
          {isCorrect ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
          <Typography sx={{ color: isCorrect ? "green" : "red", mt: 1 }}>
            {currentQuestionData.explanation}
          </Typography>
        </Box>
      )}
    </Box>
  ) : (
    <Box
      sx={{
        margin: "auto",
        textAlign: "center",
        p: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
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
        <QuizIcon color="primary" sx={{ fontSize: 50 }} />
        <Typography variant="h6" fontWeight={600} color="primary.main" mt={1}>
          Study Set
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          quiz 1
        </Typography>
        <Typography variant="body1" mt={1}>
          This study set contains <b>10 questions</b> that were generated from
          the <b>following file:</b>
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
          You have already answered <b>4 / 10</b> questions.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
        >
          <LinearProgress
            variant="determinate"
            value={40}
            sx={{
              width: "70%",
              height: 6,
              borderRadius: 3,
              backgroundColor: "#e0e0e0",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            40%
          </Typography>
        </Stack>

        <Typography variant="h6" color="primary.main" mt={2}>
          Are you ready to continue?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, px: 4 }}
          onClick={() =>
            (window.location.href =
              "/learning/course?section=quizzes&historyItem=quiz1&question=4")
          }
        >
          Continue Studying
        </Button>
      </Card>
    </Box>
  );
}
