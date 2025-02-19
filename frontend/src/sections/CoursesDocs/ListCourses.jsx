import { Grid, Typography, Box, Button } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CourseCard from "../../components/CoursesCard";

import courses from "../../constants/CoursesDocs/coursesdocs";

const ListCourses = ({ title, subcontent }) => (
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

export default ListCourses;
