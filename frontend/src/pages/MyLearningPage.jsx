import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, CardContent, CardMedia, Box, Chip, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const MyLearning = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(null);
    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = [
                    {
                        id: 1,
                        "title": "VBI Web Design Tutorial",
                        "description": "Learn HTML, CSS, and responsive design.",
                        "images": ["/path-to-image1.jpg", "/path-to-image2.jpg", "/path-to-image3.jpg"],
                        "duration": "4 Weeks",
                        "level": "Beginner",
                        "instructor": "John Smith",
                        "curriculum": ["Introduction to HTML", "Styling with CSS", "Building a Website"]
                    },
                    {
                        id: 2,
                        "title": "JavaScript Fundamentals",
                        "description": "Master JavaScript from basics to advanced topics.",
                        "images": ["/path-js1.jpg", "/path-js2.jpg", "/path-js3.jpg"],
                        "duration": "6 Weeks",
                        "level": "Intermediate",
                        "instructor": "Jane Doe",
                        "curriculum": ["Variables & Data Types", "Functions & Scope", "Asynchronous JavaScript"]
                    },
                    {
                        id: 3,
                        "title": "React Development",
                        "description": "Build modern web applications using React.",
                        "images": ["/path-react1.jpg", "/path-react2.jpg", "/path-react3.jpg"],
                        "duration": "8 Weeks",
                        "level": "Advanced",
                        "instructor": "Emily Davis",
                        "curriculum": ["JSX & Components", "State Management", "React Hooks"]
                    }
                ];
                if (!Array.isArray(data)) throw new Error("Invalid course data");
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError(error.message);
            } finally { setLoading(false); }
        };
        getCourses();
    }, []);

    if (loading) return <Typography align="center">Loading...</Typography>;
    if (error) return <Typography align="center" color="error">{error}</Typography>;

    return (
        <Container maxWidth="xl" sx={{ mt: 15 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
                <Typography variant="h4" fontWeight="bold">My Learning</Typography>
                <Button onClick={() => navigate("/mylearning/createcourse")} variant="contained" startIcon={<AddIcon sx={{ fontWeight: "bold", fontSize: "24px" }} />} sx={{ backgroundColor: "#3F51B5", color: "white", borderRadius: "12px", textTransform: "none", fontSize: "16px", padding: "8px 16px", fontWeight: "bold", "&:hover": { backgroundColor: "#303F9F" } }}>
                    Create Course
                </Button>
            </Box>
            <Grid container spacing={5}>
                {courses.map(course => (
                    <Grid item xs={12} key={course.id}>
                        <Card sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden", p: 3 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ xs: "column", sm: "row" }} textAlign={{ xs: "center", sm: "left" }} gap={2} mb={4}>
                                    <Box>
                                        <Typography variant="h5" fontWeight="bold" gutterBottom>{course.title}</Typography>
                                        <Typography variant="body1" color="textSecondary" gutterBottom>{course.description}</Typography>
                                    </Box>
                                    <Button variant="outlined" sx={{ borderColor: "blue", color: "black", borderRadius: "12px", textTransform: "none", fontSize: "16px", fontWeight: "bold", padding: "8px 16px", "&:hover": { borderColor: "blue", backgroundColor: "rgba(0, 0, 255, 0.05)" } }}>View Course</Button>
                                </Box>
                                <Grid container spacing={2} mt={2}>
                                    {course.images.map((image, i) => (
                                        <Grid item md={4} sm={6} xs={12} key={i}>
                                            <CardMedia component="img" height="100" image={image} alt={`Course image ${i + 1}`} sx={{ borderRadius: 2, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }} />
                                        </Grid>
                                    ))}
                                </Grid>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                                    <Box display="flex" gap={4}>
                                        <Typography variant="body1" sx={{ fontSize: 16, py: 0.5, fontWeight: "medium" }}>{course.duration}</Typography>
                                        <Typography variant="body1" sx={{ fontSize: 16, py: 0.5, fontWeight: "medium" }}>{course.level}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" fontWeight="bold">By {course.instructor}</Typography>
                                </Box>
                                <Box mt={3} display="flex" justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} gap={2}>
                                    <Typography variant="body2" gutterBottom sx={{ fontSize: 18, fontWeight: "bold" }}>Curriculum</Typography>
                                    <Box display="flex" flexWrap="wrap" gap={1} justifyContent={{ xs: "center", sm: "flex-end" }}>
                                        {course.curriculum.map(topic => (<Chip key={topic} label={topic} variant="outlined" color="secondary" sx={{ fontSize: 14, px: 2, py: 1 }} />))}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyLearning;
