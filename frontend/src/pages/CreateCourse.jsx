import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box, Grid, CircularProgress } from "@mui/material";
import Page from "../components/Page";
import CourseForm from "../components/CreateCourse/CourseForm";
import CourseMaterials from "../components/CreateCourse/CourseMaterials";
import CourseImages from "../components/CreateCourse/CourseImages";

const CreateCourse = () => {
  const navigate = useNavigate(); // Hook điều hướng

  // State
  const [courseData, setCourseData] = useState({
    courseName: "",
    category: null,
    introduction: "",
    description: "",
    learningMaterials: [],
    courseImages: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Tiến trình loading

  // Xử lý thay đổi dữ liệu nhập vào
  const handleInputChange = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  // Kiểm tra hợp lệ form
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

  // Xử lý quá trình loading và chuyển hướng sau khi hoàn tất
  useEffect(() => {
    if (loading) {
      setProgress(0);
      const increments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      const delayOptions = [ 200, 1000, 2000];

      let index = 0;
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }

          const increment = increments[index] || Math.floor(Math.random() * 10) + 5;
          index++;

          return Math.min(prev + increment, 100);
        });
      }, delayOptions[Math.floor(Math.random() * delayOptions.length)]);

      setTimeout(() => {
        setLoading(false);
        alert("Course created successfully!");
        navigate("/learning/course?section=chat&historyItem=overview");
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [loading, navigate]);

  // Xử lý khi nhấn "Create Course"
  const handleSubmit = () => {
    if (!validateForm()) return;
    setLoading(true);
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
                <CourseMaterials learningMaterials={courseData.learningMaterials} setCourseData={handleInputChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CourseImages courseImages={courseData.courseImages} setCourseData={handleInputChange} />
              </Grid>
            </Grid>

            {/* Nút Submit và Loading */}
            <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    gap: 1, // Khoảng cách giữa các thành phần
                    p: 2, // Thêm padding
                  }}
                >
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      variant="determinate"
                      value={progress}
                      size={70} // Kích thước lớn hơn để dễ nhìn hơn
                      thickness={5} // Viền mỏng hơn, nhìn tinh tế hơn
                      sx={{ color: "primary.main" }} // Màu chính
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
                      <Typography variant="subtitle2" color="primary">
                        {`${progress}%`}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    Creating Course...
                  </Typography>
                </Box>
              ) : (
                <Button variant="contained" sx={styles.submitButton} onClick={handleSubmit}>
                  Create Course
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
};

// Styles
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
    py: 1.5,
    borderRadius: 2,
    fontSize: "1rem",
    bgcolor: "rgba(54, 90, 202, 1)",
    fontWeight: "bold",
    textTransform: "capitalize",
    minWidth: "150px",
  },
};

export default CreateCourse;
