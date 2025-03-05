// Importing necessary react hooks and components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Importing necessary MUI components
import { Container, Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Importing custom components
import Page from "../components/Page";
import CourseList from "../components/MyLearningPage/CoursesList";

const API_URL = `${import.meta.env.VITE_MOCK_API_2}mylearningcourses`;

const MyLearning = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(API_URL);
                const data = response.data;
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format");
                }
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getCourses();
    }, []);

    if (loading) return <Typography align="center">Loading...</Typography>;

    if (error || courses.length === 0) {
        return (
            <Container maxWidth="xl" sx={{ mt: 15, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="textSecondary" mb={2}>
                    {error ? "Unable to fetch courses. Please try again later." : "You have no courses yet."}
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" mb={2}>
                        Error: {error}
                    </Typography>
                )}
                <Button
                    onClick={() => navigate("/mylearning/createcourse")}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: "#3F51B5",
                        color: "white",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontSize: "16px",
                        padding: "8px 16px",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#303F9F" }
                    }}
                >
                    Create Your First Course
                </Button>
            </Container>
        );
    }

    return (
        <Page title="My Learning">
            <Container maxWidth="xl" sx={{ mt: 15 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
                    <Typography variant="h4" fontWeight="bold">My Learning</Typography>
                    <Button
                        onClick={() => navigate("/mylearning/createcourse")}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: "#3F51B5",
                            color: "white",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "16px",
                            padding: "8px 16px",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#303F9F" }
                        }}
                    >
                        Create Course
                    </Button>
                </Box>
                <CourseList courses={courses} />
            </Container>
        </Page>
    );
};

export default MyLearning;