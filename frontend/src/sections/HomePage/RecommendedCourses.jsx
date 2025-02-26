import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import courses from "../../constants/HomePage/courses";
import CourseCard from "../../components/HomePage/RecommendedCourses/CourseCard";
import { Link } from "react-router-dom";

const RecommendedCourses = () => (
  <Box sx={{ p: 4 }}>
    <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left" }}>
          🎓 Recommended Courses 🎓
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Link to="/allcourse" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: 2,
              color: "#365ACA",
              bgcolor: "white",
              border: "solid 2px #365ACA",
              fontWeight: "bold",
            }}
          >
            Explore All Courses
          </Button>
        </Link>
      </Grid>
    </Grid>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ textAlign: "justify", mb: 4 }}
    >
      Discover handpicked courses tailored to your learning journey. Whether
      you're a beginner looking to build a strong foundation or an advanced
      learner seeking to refine your expertise, our carefully curated selection
      covers a wide range of topics. Explore interactive lessons, expert-led
      tutorials, and practical exercises designed to elevate your skills and
      help you achieve your personal and professional goals with confidence.
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      {courses.map((course) => (
        <Grid item xs={12} sm={12} md={6} key={course.id}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default RecommendedCourses;
