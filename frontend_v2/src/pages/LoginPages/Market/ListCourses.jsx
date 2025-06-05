// Desc: List of courses with a button to load more courses

// Importing React modules
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from 'react';

// Importing Material-UI components
import { Grid, Typography, Box, Button, CircularProgress } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

// Lazy loading custom components
const CourseCard = lazy(() => import("@components/ui/CoursesCard"));

// Importing courses data
import courses from "./constants.js";

// Functional component ListCourses
const ListCourses = ({ title, subcontent }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 4 }}>
            <Box display="flex" justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }}>
                <Box>
                    <Box sx={{ bgcolor: "rgba(233, 226, 255, 1)" }}>
                        <Typography variant="h4" fontWeight={600}>{title}</Typography>
                    </Box>
                    <Typography variant="h5" fontWeight={600} mb={4} color="textSecondary">
                        {subcontent}
                    </Typography>
                </Box>                <Box textAlign="center">
                    <Button
                        variant="contained"
                        sx={{
                            p: "10px 20px",
                            fontSize: 16,
                            borderRadius: "50px",
                            bgcolor: "rgba(54, 90, 202, 1)",
                            textTransform: "none"
                        }}
                        endIcon={<ArrowCircleRightIcon />}
                        onClick={() => navigate("/allcourse")}
                    >
                        Load More Course
                    </Button>
                </Box>
            </Box>            <Grid container spacing={3} justifyContent="center">
                {courses.map((course, index) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                        <Suspense fallback={
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, height: 300, alignItems: 'center' }}>
                                <CircularProgress size={40} />
                            </Box>
                        }>
                            <CourseCard course={course} />
                        </Suspense>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

// Exporting ListCourses component
export default ListCourses;
