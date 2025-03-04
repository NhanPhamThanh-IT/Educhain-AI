import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CourseCard from "../../components/HomePage/RecommendedCourses/CourseCard";

const RecommendedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MOCK_API_1}recommendcourses`);
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left" }}>
            🎓 Recommended Courses 🎓
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify", mb: 4 }}>
        Discover handpicked courses tailored to your learning journey. Whether you're a beginner looking to build a strong foundation or an advanced learner seeking to refine your expertise, our carefully curated selection covers a wide range of topics.
      </Typography>
      {loading ? (
        <Typography>Loading courses...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {courses.map((course) => (
            <Grid item xs={12} sm={12} md={6} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecommendedCourses;
