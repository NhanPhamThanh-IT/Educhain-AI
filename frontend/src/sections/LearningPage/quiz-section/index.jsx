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

import { questions, file } from "./constants";

const ConfirmDialog = ({ open, onClose, onConfirm, title, content }) => (
    <Dialog
        open={open}
        onClose={onClose}
        sx={{
            "& .MuiDialog-paper": { borderRadius: 4, padding: 2, minWidth: 350 },
        }}
    >
        <Box display="flex" alignItems="center" gap={1} px={2} pt={2}>
            <WarningAmber sx={{ fontSize: 30, color: "warning.main" }} />
            <DialogTitle sx={{ padding: 0, fontWeight: 600 }}>{title}</DialogTitle>
        </Box>
        <DialogContent>
            <Typography variant="body1" color="text.secondary">
                {content}
            </Typography>
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

export default function QuizSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [numberQuiz, setNumberQuiz] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const history = searchParams.get("historyItem");
    const [currentQuestion, setCurrentQuestion] = useState(
        parseInt(searchParams.get("question"), 10) - 1 || 0
    );
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const process = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            window.location.href = "/learning/course?section=quizzes&historyItem=overview";
        }, 5000);
    };

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
                                variant="outlined"
                                select
                                defaultValue="Multiple choice"
                                InputProps={{
                                    sx: { borderRadius: 3 },
                                }}
                            >
                                {["Multiple choice", "Yes no question"].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                                {40 * numberQuiz}{" "}
                                <img
                                    src="/Partials/Ecoin.png"
                                    height={30}
                                    width={30}
                                    style={{ verticalAlign: "middle" }}
                                />
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        <Stack direction="row" justifyContent="space-between">
                            <Typography fontWeight={600}>Total</Typography>
                            <Typography fontWeight={600}>
                                {40 * numberQuiz}{" "}
                                <img
                                    src="/Partials/Ecoin.png"
                                    height={30}
                                    width={30}
                                    style={{ verticalAlign: "middle" }}
                                />
                            </Typography>
                        </Stack>
                    </Stack>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
                        onClick={() => setOpenDialog(true)}
                        loading={isLoading}
                    >
                        Create
                    </Button>
                    <ConfirmDialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        onConfirm={() => {
                            setOpenDialog(false);
                            process();
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
                {/* Background Track */}
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={80}
                    thickness={4}
                    sx={{ color: "#e0e0e0", position: "absolute" }}
                />

                {/* Main Progress */}
                <CircularProgress
                    variant="determinate"
                    value={((currentQuestion + 1) / questions.length) * 100}
                    size={80}
                    thickness={4.5}
                    sx={{
                        color: "transparent",
                        position: "relative",
                        "& svg circle": {
                            stroke: "url(#progress-gradient)",
                        },
                    }}
                />

                {/* Gradient Definition */}
                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="progress-gradient" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FFC371" stopOpacity="1" />
                            <stop offset="50%" stopColor="#FF5F6D" stopOpacity="1" />
                            <stop offset="100%" stopColor="#D32F2F" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Glow Effect */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        boxShadow: "0 0 15px rgba(255, 95, 109, 0.8)", // Hiệu ứng glow
                        filter: "blur(5px)",
                        opacity: 0.6,
                    }}
                />

                {/* Percentage Display */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#333" }}>
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
                    Question {currentQuestion + 1}
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
                                            ? "#33aa33"
                                            : selectedAnswer === option
                                                ? "#E34234"
                                                : "gray.100"
                                        : selectedAnswer === option
                                            ? "lightgray"
                                            : "gray.100",
                                    color: "black",
                                    fontWeight: "bold",
                                    borderWidth: "2px",
                                    borderStyle: "solid",
                                    borderColor: submitted
                                        ? option === currentQuestionData.answer
                                            ? "#218838" // Xanh đậm hơn
                                            : selectedAnswer === option
                                                ? "#C82333" // Đỏ đậm hơn
                                                : "gray.300"
                                        : "gray.300",
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
                    <Typography sx={{ color: isCorrect ? "green" : "salmon", mt: 1 }}>
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
                    You have already answered <b>0 / 10</b> questions.
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
                >
                    <LinearProgress
                        variant="determinate"
                        value={0}
                        sx={{
                            width: "70%",
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "#e0e0e0",
                        }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        0%
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
                        "/learning/course?section=quizzes&historyItem=visual retrieval&question=1")
                    }
                >
                    Continue Studying
                </Button>
            </Card>
        </Box>
    );
}
