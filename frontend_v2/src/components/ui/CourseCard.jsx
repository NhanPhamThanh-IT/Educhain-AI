import { Card, CardContent, CardMedia, Box, Chip, Grid, Typography, Button } from "@mui/material";
import { Rocket } from "lucide-react";
import { memo } from 'react';

const CourseCard = memo(({ course }) => {
    return (
        <Grid size={{ xs: 12 }}>
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    overflow: "hidden",
                    p: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6, transform: "translateY(-5px)" }
                }}
            >
                <CardContent>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        flexDirection={{ xs: "column", sm: "row" }}
                        textAlign={{ xs: "center", sm: "left" }}
                        gap={2}
                        mb={4}
                    >
                        <Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {course.title}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                {course.description}
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            sx={{
                                border: "2px solid #3F51B5",
                                color: "#3F51B5",
                                borderRadius: "12px",
                                textTransform: "none",
                                fontSize: "16px",
                                fontWeight: "bold",
                                padding: "8px 16px",
                                transition: "0.3s",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                                    transform: "scale(1.05)"
                                }
                            }}
                            startIcon={<Rocket size={20} />}
                        >
                            Get Started Now
                        </Button>
                    </Box>
                    <Grid container spacing={2} mt={2}>
                        {course.images?.map((image, i) => (
                            <Grid size={{ md: 4, sm: 6, xs: 12 }} key={i}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={image}
                                    alt={`Course image ${i + 1}`}
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        transition: "0.3s",
                                        "&:hover": { transform: "scale(1.08)", boxShadow: 6 }
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                        <Box display="flex" gap={1}>

                            {course.duration_weeks && (
                                <Chip
                                    label={`${course.duration_weeks} weeks`}
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        fontSize: 14,
                                        px: 2,
                                        py: 1,
                                        transition: "0.3s",
                                        "&:hover": {
                                            backgroundColor: "rgba(63, 81, 181, 0.1)",
                                            transform: "scale(1.1)"
                                        }
                                    }}
                                />
                            )}
                            {course.level && (
                                <Chip
                                    label={course.level}
                                    variant="outlined"
                                    color="secondary"
                                    sx={{
                                        fontSize: 14,
                                        px: 2,
                                        py: 1,
                                        transition: "0.3s",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 64, 129, 0.1)",
                                            transform: "scale(1.1)"
                                        }
                                    }}
                                />
                            )}
                        </Box>
                        <Typography variant="body2" color="textSecondary" fontWeight="bold">
                            By {course.instructor.name}
                        </Typography>
                    </Box>
                    <Box mt={3} display="flex" justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} gap={2}>
                        <Typography variant="body2" gutterBottom sx={{ fontSize: 18, fontWeight: "bold" }}>
                            Curriculum
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={2} justifyContent={{ xs: "center", sm: "flex-end" }}>
                            {course.curriculum?.map(topic => (
                                <Chip
                                    key={topic}
                                    label={topic}
                                    variant="outlined"
                                    color="secondary"
                                    sx={{
                                        fontSize: 14,
                                        px: 2,
                                        py: 1,
                                        transition: "0.3s",
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 0, 255, 0.1)",
                                            transform: "scale(1.1)"
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}, (prevProps, nextProps) => {
    // Compare course objects to prevent unnecessary re-renders
    return JSON.stringify(prevProps.course) === JSON.stringify(nextProps.course);
});

export default CourseCard;
