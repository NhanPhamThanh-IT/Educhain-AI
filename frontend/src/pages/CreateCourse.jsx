// Description: Create Course Page

// Import React & Hooks
import React, { useState } from "react";

// Import MUI Components
import { Button, Card, CardContent, Typography, Box, Grid } from "@mui/material";

// Import Custom Components
import Page from "../components/Page";
import CourseForm from "../components/CreateCourse/CourseForm";
import CourseMaterials from "../components/CreateCourse/CourseMaterials";
import CourseImages from "../components/CreateCourse/CourseImages";

const CreateCourse = () => {
  // State Management
  const [courseData, setCourseData] = useState({
    courseName: "",
    category: null,
    introduction: "",
    description: "",
    learningMaterials: [],
    courseImages: [],
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleInputChange = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  // Form Validation
  const validateForm = () => {
    const { courseName, category, introduction, description } = courseData;
    let tempErrors = {};

    if (!courseName) tempErrors.courseName = "Course name is required";
    if (!category) tempErrors.category = "Category is required";
    if (!introduction) tempErrors.introduction = "Introduction is required";
    if (!description) tempErrors.description = "Description is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log("Course Created", courseData);
  };

  return (
    <Page title="Create Course">
      <Box sx={styles.container}>
        <Box sx={styles.titleWrapper}>
          <Typography sx={styles.title}>✏️ Create Your Own Course ✏️</Typography>
        </Box>
        <Card sx={styles.card}>
          <CardContent sx={styles.content}>
            <CourseForm {...courseData} setCourseData={handleInputChange} errors={errors} />
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <CourseMaterials {...courseData} setCourseData={handleInputChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CourseImages {...courseData} setCourseData={handleInputChange} />
              </Grid>
            </Grid>
            <Button variant="contained" sx={styles.submitButton} onClick={handleSubmit}>
              Create Course
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
};

// Styles Object
const styles = {
  container: { maxWidth: "xl", mx: "auto", mt: 15, mb: 5, px: 3 },
  titleWrapper: { display: "flex", justifyContent: "center", mb: 3 },
  title: {
    border: "solid 2px rgba(54, 90, 202, 1)",
    borderRadius: 3,
    py: 2,
    px: 3,
    display: "inline-block",
    fontSize: "1.8rem",
    fontWeight: 700,
    textAlign: "center",
    color: "white",
    background: "linear-gradient(135deg, #365ACA, #4A90E2)",
    boxShadow: "4px 4px 12px rgba(54, 90, 202, 0.4)",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "150%",
      height: "100%",
      top: 0,
      left: "-150%",
      background: "rgba(255,255,255,0.2)",
      transform: "skewX(-30deg)",
      transition: "left 0.8s ease-in-out",
    },
    "&:hover::before": { left: "150%" },
  },
  card: { px: 4, pt: 4, borderRadius: 3, boxShadow: 3 },
  content: { display: "flex", flexDirection: "column", alignItems: "center" },
  submitButton: {
    mt: 2,
    py: 1.5,
    borderRadius: 2,
    fontSize: "1rem",
    bgcolor: "rgba(54, 90, 202, 1)",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
};

export default CreateCourse;
