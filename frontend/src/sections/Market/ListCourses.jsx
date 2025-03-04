// Desc: List of courses with a button to load more courses

// Importing React modules
import { useNavigate } from "react-router-dom";

// Importing Material-UI components
import { Grid, Typography, Box, Button } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

// Importing custom components
import CourseCard from "../../components/CoursesCard";

// Importing courses data
import courses from "../../constants/CoursesDocs/coursesdocs";

// Functional component ListCourses
const ListCourses = ({ title, subcontent }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 4 }}>
            <Box display="flex" justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }}>
                <Box>
                    <Box sx={{ bgcolor: "rgba(233, 226, 255, 1)" }}>
                        <Typography variant="h4" fontWeight={600}>{title}</Typography>
                    </Box>
                    <Typography variant="h5" fontWeight={600} mb={4} color="textSecondary">
                        {subcontent}
                    </Typography>
                </Box>
                <Box textAlign="center" mt={{ xs: 2, sm: 4 }}>
                    <Button
                        variant="contained"
                        sx={{ p: "10px 20px", fontSize: 16, borderRadius: 50, bgcolor: "rgba(54, 90, 202, 1)", textTransform: "none" }}
                        endIcon={<ArrowCircleRightIcon />}
                        onClick={() => navigate("/allcourse")}
                    >
                        Load More Course
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {courses.map((course, index) => (
                    <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
                        <CourseCard course={course} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

// Exporting ListCourses component
export default ListCourses;
