import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VideocamIcon from "@mui/icons-material/Videocam";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { chatSuggestions } from "../constants";

export const InitialChatMessage = ({ setMessage }) => {
    return (
        <>
            <Box sx={{ textAlign: "center", mb: 1 }}>
                <Typography color="black">
                    What do you have to do today?
                </Typography>
                <Typography color="gray">
                    Get answers with citations to your relevant files.
                </Typography>
            </Box>

            <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", fontWeight: "bold", my: 10 }}
            >
                Create a ...
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    flexWrap: "wrap",
                    mb: 2,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={() =>
                    (window.location.href =
                        "/learning/course?section=quizzes&historyItem=overview")
                    }
                    startIcon={<QuizIcon sx={{ color: "green" }} />}
                    sx={{
                        color: "green",
                        borderColor: "green",
                        flexBasis: "20%",
                        minWidth: "120px",
                    }}
                >
                    Quiz
                </Button>
                <Button
                    variant="outlined"
                    onClick={() =>
                    (window.location.href =
                        "/learning/course?section=studyGuides&historyItem=overview")
                    }
                    startIcon={<MenuBookIcon sx={{ color: "blue" }} />}
                    sx={{
                        color: "blue",
                        borderColor: "blue",
                        flexBasis: "20%",
                        minWidth: "120px",
                    }}
                >
                    Study Guide
                </Button>
                <Button
                    variant="outlined"
                    onClick={() =>
                    (window.location.href =
                        "/learning/course?section=learningByVideo&historyItem=video2")
                    }
                    startIcon={<VideocamIcon sx={{ color: "orange" }} />}
                    sx={{
                        color: "orange",
                        borderColor: "orange",
                        flexBasis: "20%",
                        minWidth: "120px",
                    }}
                >
                    Video
                </Button>
                <Button
                    variant="outlined"
                    disabled
                    startIcon={<SportsEsportsIcon sx={{ color: "red" }} />}
                    sx={{
                        color: "red",
                        borderColor: "red",
                        flexBasis: "20%",
                        minWidth: "120px",
                        minHeight: "60px",
                    }}
                >
                    Games
                </Button>
            </Box>

            <Divider sx={{ mx: 10 }} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    justifyContent: "flex-end",
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        justifyContent: "center",
                    }}
                >
                    {chatSuggestions.map((suggestion, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            size="small"
                            color="black"
                            onClick={() => setMessage(suggestion)}
                        >
                            {suggestion}
                        </Button>
                    ))}
                </Box>
            </Box>
        </>
    );
};