import React from "react";
import { Card, CardContent, CardMedia, Box, Chip, Grid, Typography, Button } from "@mui/material";

const CourseCard = ({ course }) => {
    return (
        <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden", p: 3 }}>
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
                                borderColor: "blue",
                                color: "black",
                                borderRadius: "12px",
                                textTransform: "none",
                                fontSize: "16px",
                                fontWeight: "bold",
                                padding: "8px 16px",
                                "&:hover": { borderColor: "blue", backgroundColor: "rgba(0, 0, 255, 0.05)" }
                            }}
                        >
                            View Course
                        </Button>
                    </Box>
                    <Grid container spacing={2} mt={2}>
                        {course.images?.map((image, i) => (
                            <Grid item md={4} sm={6} xs={12} key={i}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={image}
                                    alt={`Course image ${i + 1}`}
                                    sx={{
                                        borderRadius: 2,
                                        transition: "0.3s",
                                        '&:hover': { transform: "scale(1.05)" }
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                        <Box display="flex" gap={4}>
                            <Typography variant="body1" sx={{ fontSize: 16, py: 0.5, fontWeight: "medium" }}>
                                {course.duration}
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: 16, py: 0.5, fontWeight: "medium" }}>
                                {course.level}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary" fontWeight="bold">
                            By {course.instructor}
                        </Typography>
                    </Box>
                    <Box mt={3} display="flex" justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-start" }} gap={2}>
                        <Typography variant="body2" gutterBottom sx={{ fontSize: 18, fontWeight: "bold" }}>
                            Curriculum
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1} justifyContent={{ xs: "center", sm: "flex-end" }}>
                            {course.curriculum?.map(topic => (
                                <Chip key={topic} label={topic} variant="outlined" color="secondary" sx={{ fontSize: 14, px: 2, py: 1 }} />
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default CourseCard;
