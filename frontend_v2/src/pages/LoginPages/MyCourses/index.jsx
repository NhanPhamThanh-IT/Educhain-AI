import { useEffect, useState, lazy, Suspense, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Button,
    Box,
    Grid,
    Typography,
    CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Lazy load component
const CourseCard = lazy(() => import("@components/ui/CourseCard"));

// Fallback loading component for cards
const CourseCardFallback = () => (
    <Box
        sx={{
            height: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            boxShadow: 2,
        }}
    >
        <CircularProgress />
    </Box>
);

// Reusable style constants
const buttonSx = {
    backgroundColor: "#3F51B5",
    color: "white",
    borderRadius: "12px",
    textTransform: "none",
    fontSize: "16px",
    padding: "8px 16px",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#303F9F" },
};

const MyLearning = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourseData = async () => {
            try {
                const { data } = await import("./constants");

                // Simulate delay (optional - remove in production)
                await new Promise((res) => setTimeout(res, 500));

                if (data && Array.isArray(data)) setCourses(data);
                else setCourses([]);
            } catch (err) {
                console.error("Error loading course data:", err);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        loadCourseData();
    }, []);

    if (loading) {
        return (
            <Container
                maxWidth="xl"
                sx={{
                    mt: 15,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <CircularProgress size={60} sx={{ mb: 3, color: "#3F51B5" }} />
                <Typography variant="h6" color="textSecondary">
                    Loading your courses...
                </Typography>
            </Container>
        );
    }

    if (courses.length === 0) {
        return (
            <Container maxWidth="xl" sx={{ mt: 15, textAlign: "center" }}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="textSecondary"
                    mb={2}
                >
                    You have no courses yet.
                </Typography>
                <Button
                    onClick={() => navigate("/learning/createcourse")}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={buttonSx}
                >
                    Create Your First Course
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ p: 5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
                <Typography variant="h4" fontWeight="bold">
                    My Learning
                </Typography>
                <Button
                    onClick={() => navigate("/create-course")}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={buttonSx}
                >
                    Create Course
                </Button>
            </Box>

            <Suspense fallback={<CourseCardFallback />}>
                <Grid container spacing={5}>
                    {courses.map((course) => (
                        <Grid size={{ xs: 12 }} key={course.id || course.title}>
                            <CourseCard course={course} />
                        </Grid>
                    ))}
                </Grid>
            </Suspense>
        </Container>
    );
};

export default memo(MyLearning);
