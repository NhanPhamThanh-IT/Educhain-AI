// Importing necessary react hooks and components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importing necessary MUI components
import { Container, Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Importing custom components
import Page from "../../components/Page";
import CourseList from "../../components/MyLearningPage/CoursesList";

// constants
import { data } from "./constants"; // Assuming data is imported from a constants file

const MyLearning = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Using data imported from './constants'
        if (data && Array.isArray(data)) {
            setCourses(data);
        } else {
            // Handle cases where 'data' from constants might not be as expected
            console.error("Imported constant data is invalid or not an array:", data);
            setCourses([]); // Set to empty array to prevent rendering issues
        }
    }, []); // Empty dependency array: effect runs once on mount

    if (courses.length === 0) {
        return (
            <Container maxWidth="xl" sx={{ mt: 15, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="textSecondary" mb={2}>
                    {"You have no courses yet."}
                </Typography>
                <Button
                    onClick={() => navigate("/learning/createcourse")}
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
            <Container maxWidth="xl" sx={{ pt: 15, pb: 10 }}>
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