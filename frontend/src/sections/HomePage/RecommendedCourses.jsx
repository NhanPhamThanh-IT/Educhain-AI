import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, Container } from "@mui/material";
import courses from "../../constants/HomePage/courses";

const CourseCard = ({ course }) => (
    <Card sx={{ borderRadius: 3, boxShadow: 2, height: "100%" }}>
        <CardMedia component="img" height="200" image={course.image} alt={course.title} />
        <CardContent>
            <Typography variant="body2" color="text.secondary">By {course.author}</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>{course.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{course.description}</Typography>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>Get it Now</Button>
        </CardContent>
    </Card>
);

const RecommendedCourses = () => (
    <Box sx={{ p: 4, bgcolor: "#f8f9fa" }}>
        <Container>
            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>Recommended Courses</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mb: 4 }}>
                Discover handpicked courses tailored to your learning journey. From beginner to advanced, find the perfect match to elevate your skills and achieve your goals.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {courses.map(course => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                        <CourseCard course={course} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export default RecommendedCourses;
